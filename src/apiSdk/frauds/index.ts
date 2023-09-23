import axios from 'axios';
import queryString from 'query-string';
import { FraudInterface, FraudGetQueryInterface } from 'interfaces/fraud';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFrauds = async (query?: FraudGetQueryInterface): Promise<PaginatedInterface<FraudInterface>> => {
  const response = await axios.get('/api/frauds', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFraud = async (fraud: FraudInterface) => {
  const response = await axios.post('/api/frauds', fraud);
  return response.data;
};

export const updateFraudById = async (id: string, fraud: FraudInterface) => {
  const response = await axios.put(`/api/frauds/${id}`, fraud);
  return response.data;
};

export const getFraudById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/frauds/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFraudById = async (id: string) => {
  const response = await axios.delete(`/api/frauds/${id}`);
  return response.data;
};
