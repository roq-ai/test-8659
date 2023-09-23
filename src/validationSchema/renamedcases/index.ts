import * as yup from 'yup';

export const renamedcaseValidationSchema = yup.object().shape({
  case_name: yup.string().required(),
  case_type: yup.string().nullable(),
  date_reported: yup.date().nullable(),
  status: yup.string().nullable(),
  description: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
