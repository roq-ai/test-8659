import * as yup from 'yup';

export const policyValidationSchema = yup.object().shape({
  policy_name: yup.string().required(),
  policy_type: yup.string().nullable(),
  effective_date: yup.date().nullable(),
  expiry_date: yup.date().nullable(),
  description: yup.string().nullable(),
  organization_id: yup.string().nullable().required(),
});
