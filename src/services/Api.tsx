// Api.ts
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Interceptor from './Interceptor';

const createApiInstance = (navigate: ReturnType<typeof useNavigate>): Api => {
  const interceptor = new Interceptor(navigate);
  const apiInstance = interceptor.setupAxiosInterceptors();
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
      toast.error((error.response?.data?.message || error.message));
      throw error;
    }
  }

  async loginAccount(data: { email: string; password: string; }): Promise<any> {
    try {
      const response = await this.api.post('/api/auth', data);
      toast.success('Login successful');
      return response.data;
    } catch (error: any) {
      toast.error((error.response?.data?.message || error.message));
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
      toast.error( (error.response?.data?.message || error.message));
      throw error;
    }
  }
  async createUser(data: { name: string; password: string; email: string; role: string }): Promise<any> {
    try {
      const response = await this.api.post('/api/users/create', data);
      toast.success('User created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error creating user: ' + (error.response?.data?.message || error.message));
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
  async searchUsers(searchCondition: any, pageNum: number, pageSize: number): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/users/search', {
        searchCondition,
        pageInfo: {
          pageNum,
          pageSize
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error: any) {
      toast.error('Error searching users: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async changeUserStatus(userId: string, status: boolean): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.put('/api/users/change-status', {
        user_id: userId,
        status: status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('User status updated successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error updating user status: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.put(`/api/users/change-password`, {
        user_id: userId,
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Password changed successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error changing password: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
  async createCourse(data: {
    name: string;
    category_id: string;
    description: string;
    content: string;
    video_url: string;
    image_url: string;
    price: number;
    discount: number;
  }): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/course', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Course created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error creating course: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async createSession(data: {
    name: string;
    course_id: string;
    description: string;
  }): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/session', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Session created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error creating session: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async createLesson(data: {
    name: string;
    course_id: string;
    session_id: string;
    lesson_type: string;
    description: string;
    video_url: string;
    image_url: string;
    full_time: number;
    position_order: number;
  }): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/lesson', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Lesson created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error creating lesson: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
  async createCategory(data: { name: string }): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/category', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Category created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error creating category: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }

  async getCategories(searchCondition: any, pageNum?: number, pageSize?: number): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/category/search', {
        searchCondition,
        pageInfo: {
          pageNum,
          pageSize
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error: any) {
      toast.error('Error fetching categories: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }


  async createSubCategory(data: { name: string; parent_category_id: string; description: string }): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/category', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('SubCategory created successfully');
      return response.data;
    } catch (error: any) {
      toast.error('Error creating subcategory: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
  async getSubCategories(searchCondition: any, pageNum: number = 1, pageSize: number = 10): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const response = await this.api.post('/api/category/search', {
        searchCondition,
        pageInfo: {
          pageNum,
          pageSize
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error: any) {
      toast.error('Error fetching subcategories: ' + (error.response?.data?.message || error.message));
      throw error;
    }
  }
}

export { createApiInstance, Api };
