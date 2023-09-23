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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getComplianceById, updateComplianceById } from 'apiSdk/compliances';
import { complianceValidationSchema } from 'validationSchema/compliances';
import { ComplianceInterface } from 'interfaces/compliance';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function ComplianceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ComplianceInterface>(
    () => (id ? `/compliances/${id}` : null),
    () => getComplianceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ComplianceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateComplianceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/compliances');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ComplianceInterface>({
    initialValues: data,
    validationSchema: complianceValidationSchema,
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
              label: 'Compliances',
              link: '/compliances',
            },
            {
              label: 'Update Compliance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Compliance
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.compliance_name}
            label={'Compliance Name'}
            props={{
              name: 'compliance_name',
              placeholder: 'Compliance Name',
              value: formik.values?.compliance_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.compliance_type}
            label={'Compliance Type'}
            props={{
              name: 'compliance_type',
              placeholder: 'Compliance Type',
              value: formik.values?.compliance_type,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_implemented" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Implemented
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_implemented ? new Date(formik.values?.date_implemented) : null}
              onChange={(value: Date) => formik.setFieldValue('date_implemented', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

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
              onClick={() => router.push('/compliances')}
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
    entity: 'compliance',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ComplianceEditPage);
