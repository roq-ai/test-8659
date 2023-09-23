import { ComplianceInterface } from 'interfaces/compliance';
import { PolicyInterface } from 'interfaces/policy';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  location?: string;
  established_date?: any;
  industry_type?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  compliance?: ComplianceInterface[];
  policy?: PolicyInterface[];
  user?: UserInterface;
  _count?: {
    compliance?: number;
    policy?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  location?: string;
  industry_type?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
