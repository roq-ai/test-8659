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

import { createRenamedcase } from 'apiSdk/renamedcases';
import { renamedcaseValidationSchema } from 'validationSchema/renamedcases';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { RenamedcaseInterface } from 'interfaces/renamedcase';

function RenamedcaseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RenamedcaseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRenamedcase(values);
      resetForm();
      router.push('/renamedcases');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RenamedcaseInterface>({
    initialValues: {
      case_name: '',
      case_type: '',
      date_reported: new Date(new Date().toDateString()),
      status: '',
      description: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: renamedcaseValidationSchema,
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
              label: 'Renamedcases',
              link: '/renamedcases',
            },
            {
              label: 'Create Renamedcase',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Renamedcase
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.case_name}
            label={'Case Name'}
            props={{
              name: 'case_name',
              placeholder: 'Case Name',
              value: formik.values?.case_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.case_type}
            label={'Case Type'}
            props={{
              name: 'case_type',
              placeholder: 'Case Type',
              value: formik.values?.case_type,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date_reported" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Reported
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_reported ? new Date(formik.values?.date_reported) : null}
              onChange={(value: Date) => formik.setFieldValue('date_reported', value)}
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

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/renamedcases')}
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
    entity: 'Renamedcase',
    operation: AccessOperationEnum.CREATE,
  }),
)(RenamedcaseCreatePage);
