import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-toastify';

let setLoading: (loading: boolean) => void = () => {};

export const setGlobalLoadingHandler = (loadingHandler: (loading: boolean) => void) => {
  setLoading = loadingHandler;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
      switch (response.status) {
        case 400:
        case 404:
          handleErrorByToast(err);
          break;
        default:
          break;
      }
    }
    return Promise.reject(err);
  }
);

const handleErrorByToast = (error: AxiosError) => {
  const data = error.response?.data as { message?: string };
  const message = data?.message ?? error.message;
  console.log(message);
  toast.error(message);
  return Promise.reject(error);
};

export default axiosInstance;
