import * as yup from 'yup';

export const complianceValidationSchema = yup.object().shape({
  compliance_name: yup.string().required(),
  compliance_type: yup.string().nullable(),
  date_implemented: yup.date().nullable(),
  status: yup.string().nullable(),
  description: yup.string().nullable(),
  organization_id: yup.string().nullable().required(),
});
