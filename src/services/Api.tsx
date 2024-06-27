import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const setupAxiosInterceptors = (navigate: ReturnType<typeof useNavigate>): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  // Add a response interceptor
  api.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;
      const errorMessage = error.response?.data?.message || '';
      if (status) {
        if (status === 400 && errorMessage.includes('already exists')) {
          // Do not navigate to /400 for this specific error message
          return Promise.reject({
            ...error,
            emailExists: true,
            message: errorMessage
          });
        } else if (status === 400) {
          navigate('/400');
        } else if (status === 404) {
          navigate('/404');
        } else if (status === 403) {
          navigate('/403');
        }
        console.error(`API error with status ${status}`);
      }
      return Promise.reject(error);
    }
  );

  return api;
}

const createApiInstance = (navigate: ReturnType<typeof useNavigate>): Api => {
  const apiInstance = setupAxiosInterceptors(navigate);
  return new Api(apiInstance);
}

class Api {
  private api: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  async registerAccount(data: { name: string; email: string; password: string; role: string; }): Promise<any> {
    try {
      console.log('Register request to:', this.api.defaults.baseURL + '/api/users');
      console.log('Register data:', data);
      const response = await this.api.post('/api/users', data);
      toast.success('Registration successful');
      return response.data;
    } catch (error: any) {
      if (error.emailExists) {
        return { emailExists: true, message: error.message };
      }
      toast.error('Error registering: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async loginAccount(data: { email: string; password: string; }): Promise<any> {
    try {
      console.log('Login request to:', this.api.defaults.baseURL + '/login');
      console.log('Login data:', data);
      const response = await this.api.post('/login', data);
      toast.success('Login successful');
      return response.data;
    } catch (error: any) {
      toast.error('Error logging in: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
}

export { createApiInstance, Api };
