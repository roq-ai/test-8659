import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PolicyInterface {
  id?: string;
  policy_name: string;
  policy_type?: string;
  effective_date?: any;
  expiry_date?: any;
  description?: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface PolicyGetQueryInterface extends GetQueryInterface {
  id?: string;
  policy_name?: string;
  policy_type?: string;
  description?: string;
  organization_id?: string;
}
