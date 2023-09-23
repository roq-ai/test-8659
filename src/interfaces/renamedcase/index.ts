import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RenamedcaseInterface {
  id?: string;
  case_name: string;
  case_type?: string;
  date_reported?: any;
  status?: string;
  description?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface RenamedcaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  case_name?: string;
  case_type?: string;
  status?: string;
  description?: string;
  user_id?: string;
}
