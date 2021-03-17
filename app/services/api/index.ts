import apisauce, { ApisauceInstance } from 'apisauce';
import CONFIG from '../../config/env';
import { Credential, User } from './api.types';

class Api {
  private client: ApisauceInstance;

  constructor(baseURL = CONFIG.API_URL) {
    this.client = apisauce.create({
      baseURL,
      timeout: 10000,
      headers: { 'Cache-Control': 'no-cache' },
    });
  }

  getUser = () => this.client.get<User>('/api/user/'); // TOOD: Remove this sample method

  addCertificate = (url: string, data: any) =>
    this.client.post<Credential>(url, data);
}

export const apiInstance = new Api();

export default Api;
