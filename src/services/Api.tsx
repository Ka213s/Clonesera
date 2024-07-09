import axiosInstance from './axiosInstance';

export const getCourses = async (searchCondition: { keyword: string; category: string; status: string; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/course/search', {
    searchCondition,
    pageInfo: { pageNum, pageSize}
  });
  return response.data;
};


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