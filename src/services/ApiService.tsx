import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://665fbf915425580055b0b389.mockapi.io/GR3_Account';
const BASE_URL_COURSE = 'https://665fbf915425580055b0b389.mockapi.io/GR3_Crouse';

export interface CourseData {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    skillCourse: string;
    price: string;
    requirements: string;
    Account_Id: string;
    status: boolean;
    certificateUrl?: string; 
}

export interface SectionData {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    skillCourse: string;
    price: string;
    requirements: string;
    Account_Id: string;
    status: boolean;
    certificateUrl?: string; 
}

export interface LectureData {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    skillCourse: string;
    price: string;
    requirements: string;
    Account_Id: string;
    status: boolean;
    certificateUrl?: string; 
}

export interface UserData {
    fullName: string;
    email: string;
    avatar: string;
    createdAt: string;
    status: boolean;
    password: string | null;
    address: string | null;
    updateAt: string | null;
    phonenumber: string | null;
    walletId: string | null;
    roleId: number;
    isGoogle: boolean;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface AccountData {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    createdAt: string;
    status: boolean;
    password: string | null;
    address: string | null;
    updateAt: string | null;
    phonenumber: string | null;
    walletId: string | null;
    roleId: number;
    isGoogle: boolean; // Add this property
}

class ApiService {
    static async saveGoogleUserData(userData: UserData) {
        try {
            await axios.post(BASE_URL, userData);
            toast.success('User data saved successfully');
        } catch (error) {
            toast.error('Error saving user data');
            console.error('Error saving user data to API', error);
            return null;
        }
    }

    static async forgotPassword(email: string) {
        try {
            // Simulating an API call to send a password reset email
            console.log(`Sending password reset email to ${email}`);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Password reset email sent successfully');
            return { success: true };
        } catch (error) {
            toast.error('Error sending password reset email');
            console.error('Error sending password reset email', error);
            return { success: false };
        }
    }

    static async verifyGoogleToken(token: string) {
        try {
            const response = await axios.post('https://your-backend-endpoint.com/api/verifyGoogleToken', { token });
            toast.success('Google token verified successfully');
            return response.data;
        } catch (error) {
            toast.error('Error verifying Google token');
            console.error('Error verifying Google token:', error);
            throw error;
        }
    }

    static async getUserByEmail(email: string) {
        try {
            const response = await axios.get(`${BASE_URL}?email=${email}`);
            return response.data;
        } catch (error) {
            toast.error('Error fetching user by email');
            console.error('Error fetching user by email:', error);
            return null;
        }
    }

    static async getAccounts(role: string) {
        try {
            const response = await axios.get(`${BASE_URL}?roleId=${role}`);
            return response.data;
        } catch (error) {
            toast.error('Error fetching account data');
            console.error('Error fetching account data:', error);
            return null;
        }
    }

    static async registerAccount(data: any) {
        try {
            const response = await axios.post(BASE_URL, data);
            toast.success('Account registered successfully');
            return response.data;
        } catch (error) {
            toast.error('Error registering account');
            console.error('Error registering account:', error);
            return null;
        }
    }

    static async login(data: { email: string; password: string }) {
        try {
            const response = await axios.get(`${BASE_URL}?email=${data.email}&password=${data.password}`);
            toast.success('Login successful');
            return response.data;
        } catch (error) {
            toast.error('Invalid email or password, or account is inactive');
            console.error('Error logging in:', error);
            return null;
        }
    }
    

    static async getAccountById(roleId: string) {
        try {
            const response = await axios.get(`${BASE_URL}/${roleId}`);
            return response.data;
        } catch (error) {
            toast.error('Error fetching account data');
            console.error('Error fetching account data:', error);
            return null;
        }
    }

    static async updateAccount(id: string, data: any) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, data);
            toast.success('Profile updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Error updating account');
            console.error('Error updating account:', error);
            return null;
        }
    }

    static async changePassword(id: string, email: string, currentPassword: string, newPassword: string) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}/changePassword`, { email, currentPassword, newPassword });
            toast.success('Password changed successfully');
            return response.data;
        } catch (error) {
            toast.error('Error changing password');
            console.error('Error changing password:', error);
            return null;
        }
    }

    static async getAccountsByRole(roleId: number) {
        try {
            const response = await axios.get(`${BASE_URL}/${roleId}`);
            return response.data;
        } catch (error) {
            toast.error('Error fetching account data');
            console.error("Error fetching account data:", error);
            return null;
        }
    }

    static async updateAccountStatus(id: number, currentStatus: boolean) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, {
                status: !currentStatus,
            });
            toast.success('Account status updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Error updating account status');
            console.error("Error updating account status:", error);
            return null;
        }
    }

    static async getAccountByUserId(id: string) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            toast.error('Error fetching account data');
            console.error("Error fetching account data:", error);
            return null;
        }
    }

    static async getCourses(): Promise<CourseData[]> {
        try {
            const response = await axios.get<CourseData[]>(BASE_URL_COURSE);
            return response.data;
        } catch (error) {
            toast.error('Error fetching courses');
            console.error("Error fetching courses:", error);
            throw error;
        }
    }

    static async updateCourseById(
        id: string,
        courseData: Partial<CourseData>
    ): Promise<CourseData> {
        try {
            const response = await axios.put(`${BASE_URL_COURSE}/${id}`, courseData);
            toast.success('Course updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Error updating course');
            console.error("Error updating course:", error);
            throw error;
        }
    }

    static async updateCourseStatusById(
        id: string,
        status: boolean
    ): Promise<CourseData> {
        try {
            const response = await axios.put(`${BASE_URL_COURSE}/${id}`, { status });
            toast.success('Course status updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Error updating course status');
            console.error("Error updating course status:", error);
            throw error;
        }
    }

    static async deleteCourse(id: string): Promise<void> {
        try {
            const response = await axios.delete(`${BASE_URL_COURSE}/${id}`);
            toast.success('Course deleted successfully');
            return response.data;
        } catch (error) {
            toast.error('Error deleting course');
            console.error("Error deleting course:", error);
            throw error;
        }
    }

    static async softDeleteCourse(id: string): Promise<CourseData> {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, { status: false });
            toast.success('Course soft deleted successfully');
            return response.data;
        } catch (error) {
            toast.error('Error soft deleting course');
            console.error("Error soft deleting course:", error);
            throw error;
        }
    }

     // Section Management Methods

     static async getSections(): Promise<SectionData[]> {
        try {
            const response = await axios.get<SectionData[]>(BASE_URL_COURSE);
            return response.data;
        } catch (error) {
            toast.error('Error fetching sections');
            console.error("Error fetching sections:", error);
            throw error;
        }
    }

    static async addSection(section: SectionData): Promise<SectionData> {
        try {
            const response = await axios.post(BASE_URL_COURSE, section);
            toast.success('Section added successfully');
            return response.data;
        } catch (error) {
            toast.error('Error adding section');
            console.error('Error adding section:', error);
            throw error;
        }
    }

    static async updateSectionById(
        id: string,
        sectionData: Partial<SectionData>
    ): Promise<SectionData> {
        try {
            const response = await axios.put(`${BASE_URL_COURSE}/${id}`, sectionData);
            toast.success('Section updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Error updating section');
            console.error('Error updating section:', error);
            throw error;
        }
    }

    static async deleteSection(id: string): Promise<void> {
        try {
            await axios.delete(`${BASE_URL_COURSE}/${id}`);
            toast.success('Section deleted successfully');
        } catch (error) {
            toast.error('Error deleting section');
            console.error('Error deleting section:', error);
            throw error;
        }
    }

    static async softDeleteSection(id: string): Promise<SectionData> {
        try {
            const response = await axios.put(`${BASE_URL_COURSE}/${id}`, { status: false });
            toast.success('Section soft deleted successfully');
            return response.data;
        } catch (error) {
            toast.error('Error soft deleting section');
            console.error('Error soft deleting section:', error);
            throw error;
        }
    }

     // Lecture Management Methods

     static async getLectures(): Promise<LectureData[]> {
        try {
            const response = await axios.get<LectureData[]>(BASE_URL_COURSE);
            return response.data;
        } catch (error) {
            toast.error('Error fetching lectures');
            console.error('Error fetching lectures:', error);
            throw error;
        }
    }

    static async addLecture(lecture: LectureData): Promise<LectureData> {
        try {
            const response = await axios.post(BASE_URL_COURSE, lecture);
            toast.success('Lecture added successfully');
            return response.data;
        } catch (error) {
            toast.error('Error adding lecture');
            console.error('Error adding lecture:', error);
            throw error;
        }
    }

    static async updateLectureById(
        id: string,
        lectureData: Partial<LectureData>
    ): Promise<LectureData> {
        try {
            const response = await axios.put(`${BASE_URL_COURSE}/${id}`, lectureData);
            toast.success('Lecture updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Error updating lecture');
            console.error('Error updating lecture:', error);
            throw error;
        }
    }

    static async deleteLecture(id: string): Promise<void> {
        try {
            await axios.delete(`${BASE_URL_COURSE}/${id}`);
            toast.success('Lecture deleted successfully');
        } catch (error) {
            toast.error('Error deleting lecture');
            console.error('Error deleting lecture:', error);
            throw error;
        }
    }

    static async softDeleteLecture(id: string): Promise<LectureData> {
        try {
            const response = await axios.put(`${BASE_URL_COURSE}/${id}`, { status: false });
            toast.success('Lecture soft deleted successfully');
            return response.data;
        } catch (error) {
            toast.error('Error soft deleting lecture');
            console.error('Error soft deleting lecture:', error);
            throw error;
        }
    }

    // Category Management Methods
    static async getCategories(searchQuery = '') {
        try {
            const response = await axios.get(`${BASE_URL}?q=${searchQuery}`);
            return response.data;
        } catch (error) {
            toast.error('Error fetching categories');
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    static async addCategory(category: Category) {
        try {
            const response = await axios.post(BASE_URL, category);
            toast.success('Category added successfully');
            return response.data;
        } catch (error) {
            toast.error('Error adding category');
            console.error('Error adding category:', error);
            return null;
        }
    }

    static async updateCategory(id: number, category: Category) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, category);
            toast.success('Category updated successfully');
            return response.data;
        } catch (error) {
            toast.error('Error updating category');
            console.error('Error updating category:', error);
            return null;
        }
    }

    static async deleteCategory(id: number) {
        try {
            const response = await axios.delete(`${BASE_URL}/${id}`);
            toast.success('Category deleted successfully');
            return response.data;
        } catch (error) {
            toast.error('Error deleting category');
            console.error('Error deleting category:', error);
            return null;
        }
    }
}

export default ApiService;
