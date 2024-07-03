// Interceptor.ts
import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';

class Interceptor {
  private navigate: ReturnType<typeof useNavigate>;

  constructor(navigate: ReturnType<typeof useNavigate>) {
    this.navigate = navigate;
  }

  private handleSpecificErrorResponse(error: any) {
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
    } else if (status === 400 && errorMessage.includes('token expired')) {
      // Handle the specific case for expired token
      this.navigate('/logout');
      return Promise.reject({
        ...error,
        tokenExpired: true,
        message: errorMessage
      });
    }

    return null;
  };

  private handleErrorResponse(error: any) {
    const specificError = this.handleSpecificErrorResponse(error);
    if (specificError) return specificError;

    const status = error.response ? error.response.status : null;

    if (status) {
      if (status === 400) {
        this.navigate('/400');
      } else if (status === 404) {
        this.navigate('/404');
      } else if (status === 403) {
        this.navigate('/403');
      } else if (status === 500) {
        this.navigate('/500');
      } else if (status === 401) {
        this.navigate('/401');
      } else if (status === 501) {
        this.navigate('/501');
      }
      console.error(`API error with status ${status}`);
    }
    return Promise.reject(error);
  };

  public setupAxiosInterceptors(): AxiosInstance {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    // Add a response interceptor
    api.interceptors.response.use(
      response => response,
      error => this.handleErrorResponse(error)
    );

    return api;
  }
}

export default Interceptor;
