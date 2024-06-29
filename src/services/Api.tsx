import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const handleSpecificErrorResponse = (error: any) => {
  const status = error.response ? error.response.status : null;
  const errorMessage = error.response?.data?.message || '';

  if (status === 400 && errorMessage.includes('already exists')) {
    return Promise.reject({
      ...error,
      emailExists: true,
      message: errorMessage
    });
  } else if (status === 400 && errorMessage.includes("Can't parse token payload")) {
    return Promise.reject({
      ...error,
      parseTokenError: true,
      message: errorMessage
    });
  }

  return null;
};

const handleErrorResponse = (error: any, navigate: ReturnType<typeof useNavigate>) => {
  const specificError = handleSpecificErrorResponse(error);
  if (specificError) return specificError;

  const status = error.response ? error.response.status : null;
 
  if (status) {
    if (status === 400) {
      navigate('/400');
    } else if (status === 404) {
      navigate('/404');
    } else if (status === 403) {
      navigate('/403');
    }
    console.error(`API error with status ${status}`);
  }
  return Promise.reject(error);
};

const setupAxiosInterceptors = (navigate: ReturnType<typeof useNavigate>): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  // Add a response interceptor
  api.interceptors.response.use(
    response => response,
    error => handleErrorResponse(error, navigate)
  );

  return api;
};

const createApiInstance = (navigate: ReturnType<typeof useNavigate>): Api => {
  const apiInstance = setupAxiosInterceptors(navigate);
  return new Api(apiInstance);
};

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

  async registerUserByGoogle(data: { google_id: string; role: string; }): Promise<any> {
    try {
      const response = await this.api.post('/api/users/google', data);
      toast.success('Signed up for Google successfully. Please log in again', {
        autoClose: 8000,
      });
      return response.data;
    } catch (error: any) {
      toast.error('Error registering with Google: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async loginUserByGoogle(data: { google_id: string; }): Promise<any> {
    try {
      const response = await this.api.post('/api/auth/google', data);
      toast.success('Google login successful', {
        autoClose: 8000,
      });
      return response.data;
    } catch (error: any) {
      if (error.parseTokenError) {
        return { parseTokenError: true, message: error.message };
      }
      toast.error('You have not signed up for a Google account', {
        autoClose: 8000,
      });
      throw error;
    }
  }

  async getDataUser(token: string | null): Promise<any> {
    try {
      if (!token) {
        throw new Error('Token is null or empty');
      }
  
      const response = await this.api.get('/api/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error: any) {
      toast.error('Error getting user data: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
  
  async updateAccount(userId: string, data: { name: string; phone_number: string; description: string; email: string; avatar: string | ArrayBuffer | null; role: string; video: string; }): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.put(`/api/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Profile updated successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error updating profile: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
  
  
}

export { createApiInstance, Api };
