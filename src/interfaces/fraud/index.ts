import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FraudInterface {
  id?: string;
  fraud_name: string;
  fraud_type?: string;
  date_detected?: any;
  status?: string;
  description?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface FraudGetQueryInterface extends GetQueryInterface {
  id?: string;
  fraud_name?: string;
  fraud_type?: string;
  status?: string;
  description?: string;
  user_id?: string;
}
