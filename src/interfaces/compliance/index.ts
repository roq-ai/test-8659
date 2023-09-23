import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ComplianceInterface {
  id?: string;
  compliance_name: string;
  compliance_type?: string;
  date_implemented?: any;
  status?: string;
  description?: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ComplianceGetQueryInterface extends GetQueryInterface {
  id?: string;
  compliance_name?: string;
  compliance_type?: string;
  status?: string;
  description?: string;
  organization_id?: string;
}
