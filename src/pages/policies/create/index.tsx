import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPolicy } from 'apiSdk/policies';
import { policyValidationSchema } from 'validationSchema/policies';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { PolicyInterface } from 'interfaces/policy';

function PolicyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PolicyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPolicy(values);
      resetForm();
      router.push('/policies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PolicyInterface>({
    initialValues: {
      policy_name: '',
      policy_type: '',
      effective_date: new Date(new Date().toDateString()),
      expiry_date: new Date(new Date().toDateString()),
      description: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: policyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Policies',
              link: '/policies',
            },
            {
              label: 'Create Policy',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Policy
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.policy_name}
            label={'Policy Name'}
            props={{
              name: 'policy_name',
              placeholder: 'Policy Name',
              value: formik.values?.policy_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.policy_type}
            label={'Policy Type'}
            props={{
              name: 'policy_type',
              placeholder: 'Policy Type',
              value: formik.values?.policy_type,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="effective_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Effective Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.effective_date ? new Date(formik.values?.effective_date) : null}
              onChange={(value: Date) => formik.setFieldValue('effective_date', value)}
            />
          </FormControl>
          <FormControl id="expiry_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expiry Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.expiry_date ? new Date(formik.values?.expiry_date) : null}
              onChange={(value: Date) => formik.setFieldValue('expiry_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/policies')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'policy',
    operation: AccessOperationEnum.CREATE,
  }),
)(PolicyCreatePage);
