import * as yup from 'yup';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  location: yup.string().nullable(),
  established_date: yup.date().nullable(),
  industry_type: yup.string().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
