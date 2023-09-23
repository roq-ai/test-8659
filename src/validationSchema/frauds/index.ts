import * as yup from 'yup';

export const fraudValidationSchema = yup.object().shape({
  fraud_name: yup.string().required(),
  fraud_type: yup.string().nullable(),
  date_detected: yup.date().nullable(),
  status: yup.string().nullable(),
  description: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
