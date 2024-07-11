import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';


export const loginAccount = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/api/auth", data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const getCurrentLogin = async () => {
  const response = await axiosInstance.get("/api/auth");
  return response.data;
};

export const getUserData = async (id: string) => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response.data;
};

export const updateAccount = async (id: string, data: { name?: string; description?: string; phone_number?: string; avatar?: string; dob?: string }) => {
  const response = await axiosInstance.put(`/api/users/${id}`, data);
  return response.data;
};

export const getCategories = async (searchCondition: { keyword: string; category: string; status: string; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/category/search', { 
    searchCondition, 
    pageInfo: { pageNum, pageSize } });

  return response.data;
};

export const createCategory = async (data: { name: string; description: string; parent_category_id?: string }) => {
  const response = await axiosInstance.post('/api/category', data);
  
  return response.data;
};

export const editCategory = async (id: string, data: { name: string; description: string; parent_category_id?: string }) => {
  const response = await axiosInstance.put(`/api/category/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await axiosInstance.delete(`/api/category/${id}`);
  return response.data;
};
export const loginUserByGoogle = async (data: { google_id: string; }) => {
  const response = await axiosInstance.post("/api/auth/google", data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  toast.success("Google login successful");
  return response.data;
};
export const registerUserByGoogle = async (data: { google_id: string; role: string; }) => {
  const response = await axiosInstance.post("/api/users/google", data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  toast.success("Google registration successful");
  return response.data;
};
export const createCourse = async (data: { name: string; category_id: string; description: string; content: string; video_url: string; image_url: string; price: number; discount: number; }) => {
  const response = await axiosInstance.post('/api/course', data);
  toast.success("Course created successfully");
  return response.data;
};

export const getCourses = async (searchCondition: { keyword: string; category: string; status: string; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/course/search', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};
export const createSession = async (data: { name: string; course_id: string; description: string; }) => {
  const response = await axiosInstance.post('/api/session', data);
  toast.success("Session created successfully");
  return response.data;
};
