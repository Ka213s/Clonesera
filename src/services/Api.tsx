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
      const response = await this.api.post('/api/auth', data);
      toast.success('Login successful');
      return response.data;
    } catch (error: any) {
      toast.error('Error logging in: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async loginWithGoogle(data: { google_id: string; role: string; }): Promise<any> {
    try {
      const response = await this.api.post('/api/users/google', data);
      toast.success('Google login successful');
      return response.data;
    } catch (error: any) {
      toast.error('Error logging in with Google: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async updateAccount(userId: string, data: any): Promise<any> {
    try {
      const response = await this.api.put(`/api/users/${userId}`, data);
      toast.success('Account updated successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error updating account: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async getAccountById(userId: string): Promise<any> {
    try {
      const response = await this.api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error: any) {
      toast.error('Error fetching user data: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async changePassword(userId: string, email: string, currentPassword: string, newPassword: string): Promise<any> {
    try {
      const response = await this.api.put(`/api/users/${userId}/change-password`, {
        email,
        currentPassword,
        newPassword,
      });
      toast.success('Password changed successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error changing password: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

}

export { createApiInstance, Api };
