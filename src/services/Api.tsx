import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';

export const registerAccountStudent = async (data: { name: string; email: string; password: string; role: string; }) => {
  const response = await axiosInstance.post("/api/users", data);
  return response.data;
};
export const registerAccountInstructor = async (data: { name: string; email: string; password: string; role: string; phone_number: string; description: string; video: string; avatar: string; }) => {
  const response = await axiosInstance.post("/api/users", data);
  return response.data;
};

export const loginAccount = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/api/auth", data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  toast.success("Login successful");
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

export const registerUserByGoogle = async (data: { google_id: string; role: string; description: string; video: string; phone_number: string; }) => {
  const response = await axiosInstance.post("/api/users/google", data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  toast.success("Google registration successful");
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await axiosInstance.put("/api/auth/forgot-password", data);
  toast.success("Password reset link sent to your email");
  return response.data;
};

export const verifyEmail = async (token: string) => {

  const response = await axiosInstance.post('/api/auth/verify-token', { token });
  toast.success("Email verification successful");
  return response.data;
};

export const resendVerifyEmail = async (data: { email: string }) => {
  const response = await axiosInstance.post('/api/auth/resend-token', data);
  toast.success("Verification email resent successfully");
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

export const getUsers = async (searchCondition: { keyword: string; role: string; status: boolean; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/users/search', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};
export const createUser = async (data: { name: string; email: string; password: string; role: string; description?: string; phone_number?: string; avatar?: string; video?: string; }) => {
  const response = await axiosInstance.post('/api/users/create', data);
  toast.success("User created successfully");
  return response.data;
};

export const changeUserRole = async (data: { user_id: string; role: string }) => {
  const response = await axiosInstance.put('/api/users/change-role', data);
  toast.success("User role changed successfully");
  return response.data;
};
export const changeUserStatus = async (data: { user_id: string; status: boolean }) => {
  const response = await axiosInstance.put('/api/users/change-status', data);
  toast.success("User status changed successfully");
  return response.data;
};
export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/api/users/${id}`);
  toast.success("User deleted successfully");
  return response.data;
};
export const reviewProfileInstructor = async (data: { user_id: string, status: 'approve' | 'reject', comment?: string }) => {
  const response = await axiosInstance.put("/api/users/review-profile-instructor", data);
  toast.success("Profile review submitted successfully");
  return response.data;
};

export const changePassword = async (data: { user_id: string; old_password: string; new_password: string }) => {
  const response = await axiosInstance.put("/api/users/change-password", data);
  toast.success("Password changed successfully");
  return response.data;
};

export const updateAccount = async (id: string, data: { name?: string; description?: string; phone_number?: string; avatar?: string; dob?: string }) => {
  const response = await axiosInstance.put(`/api/users/${id}`, data);
  return response.data;
};

export const getCategories = async (searchCondition: { keyword: string; category: string; status: string; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/category/search', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};

export const createCategory = async (data: { name: string; description: string; parent_category_id?: string }) => {
  const response = await axiosInstance.post('/api/category', data);
  toast.success("Category created successfully");
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

export const createCourse = async (data: { name: string; category_id: string; description: string; content: string; video_url: string; image_url: string; price: number; discount: number; }) => {
  const response = await axiosInstance.post('/api/course', data);
  toast.success("Course created successfully");
  return response.data;
};
export const createSession = async (data: { name: string; course_id: string; description: string; }) => {
  const response = await axiosInstance.post('/api/session', data);
  toast.success("Session created successfully");
  return response.data;
};
export const createLesson = async (data: { name: string; course_id: string; session_id: string; lesson_type: string; description: string; video_url: string; image_url: string; full_time: number; position_order: number }) => {
  const response = await axiosInstance.post('/api/lesson', data);
  toast.success("Lesson created successfully");
  return response.data;
};
export const getCourses = async (searchCondition: { keyword: string; category: string; status: string; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/course/search', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};
export const getSessions = async (searchCondition: { keyword: string; course_id: string; is_position_order: boolean; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/session/search', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};

export const getLessons = async (searchCondition: { keyword: string; course_id: string; session_id: string; lesson_type: string; is_position_order: boolean; is_deleted: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/lesson/search', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};
export const getCourseById = async (id: string) => {
  const response = await axiosInstance.get(`/api/course/${id}`);
  return response.data;
};
export const updateCourse = async (id: string, data: { name: string; category_id: string; description: string; video_url: string; image_url: string; price: number; discount: number; }) => {
  const response = await axiosInstance.put(`/api/course/${id}`, data);
  toast.success("Course updated successfully");
  return response.data;
};
export const deleteCourse = async (id: string) => {
  const response = await axiosInstance.delete(`/api/course/${id}`);
  toast.success("Course deleted successfully");
  return response.data;
};
export const changeCourseStatus = async (data: { course_id: string; new_status: string; comment?: string }) => {
  const response = await axiosInstance.put('/api/course/change-status', data);
  toast.success("Course status updated successfully");
  return response.data;
};
export const getSessionById = async (id: string) => {
  const response = await axiosInstance.get(`/api/session/${id}`);
  return response.data;
};
export const updateSession = async (id: string, data: { name: string; course_id: string; description?: string; position_order: number; }) => {
  const response = await axiosInstance.put(`/api/session/${id}`, data);
  toast.success("Session updated successfully");
  return response.data;
};
export const deleteSession = async (id: string) => {
  const response = await axiosInstance.delete(`/api/session/${id}`);
  toast.success("Session deleted successfully");
  return response.data;
};
export const getLessonById = async (id: string) => {
  const response = await axiosInstance.get(`/api/lesson/${id}`);
  return response.data;
};
export const updateLesson = async (id: string, data: { name: string; course_id: string; session_id: string; user_id: string; lesson_type: string; description?: string; video_url?: string; image_url?: string; full_time: number; position_order: number }) => {
  const response = await axiosInstance.put(`/api/lesson/${id}`, data);
  toast.success("Lesson updated successfully");
  return response.data;
};
export const deleteLesson = async (id: string) => {
  const response = await axiosInstance.delete(`/api/lesson/${id}`);
  toast.success("Lesson deleted successfully");
  return response.data;
};

//Subscriptions API methods

export const getSubscribeds = async (searchCondition: { keyword: string; is_delete: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/subscription/search-for-subscriber', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};

export const getSubscribers = async (searchCondition: { keyword: string; is_delete: boolean; }, pageNum: number, pageSize: number) => {
  const response = await axiosInstance.post('/api/subscription/search-for-instructor', {
    searchCondition,
    pageInfo: { pageNum, pageSize }
  });
  return response.data;
};

export const updateSubscribed = async (instructor_id: string) => {
  const response = await axiosInstance.post('/api/subscription', { instructor_id });
  return response.data;
};

