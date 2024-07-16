import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import config from '../config/config';
import { handleHttpErrors } from '../consts/errorHandler';

interface ErrorResponse {
  message?: string;
  errors?: { message?: string }[];
}

let setLoading: (loading: boolean) => void = () => {};

export const setGlobalLoadingHandler = (loadingHandler: (loading: boolean) => void) => {
  setLoading = loadingHandler;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'content-type': 'application/json; charset=UTF-8'
  },
  timeout: 300000,
  timeoutErrorMessage: 'Connection timeout exceeded'
});

axiosInstance.interceptors.request.use(
  (config) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    setLoading(false);
    return response.data;
  },
  (err: AxiosError) => {
    setLoading(false);
    const { response } = err;
    if (response) {
      if (response.status === 403) {
        handleTokenExpiration();
      } else {
        handleErrorByToast(err);
        handleHttpErrors(response.status);
      }
    }
    return Promise.reject(err);
  }
);

const handleTokenExpiration = () => {
  toast.error('Session expired. Please log in again.');
  localStorage.removeItem('token'); // Optionally clear the token
  window.location.href = '/login'; // Redirect to login page
};

const handleErrorByToast = (errors: AxiosError) => {
  const data = errors.response?.data as ErrorResponse | undefined;
  let message: string | undefined = data?.message ?? errors.message ?? 'An error occurred';

  if (!data?.message && data?.errors?.length) {
    const errorMessages = data.errors.map(error => error.message).filter(Boolean);
    if (errorMessages.length) {
      message = errorMessages.join(', ');
    }
  }
  console.log('Error:', data);
  toast.error(message);
  return Promise.reject(data?.errors ?? { message });
};

export default axiosInstance;
