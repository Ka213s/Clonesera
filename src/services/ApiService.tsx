import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://665fbf915425580055b0b389.mockapi.io/GR3_Account';
const CATEGORY_URL = 'https://665fbf915425580055b0b389.mockapi.io/SubCategory';

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

class ApiService {
    static async saveGoogleUserData(userData: UserData) {
        try {
            await axios.post(BASE_URL, userData);
        } catch (error) {
            console.error('Error saving user data to API', error);
            return null;
        }
    }
    
    static async getUserByEmail(email: string) {
        try {
            const response = await axios.get(`${BASE_URL}?email=${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            return null;
        }
    }
    
    static async getAccounts(role: string) {
        try {
            const response = await axios.get(`${BASE_URL}?roleId=${role}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching account data:', error);
            return null;
        }
    }
    
    static async registerAccount(data: any) {
        try {
            const response = await axios.post(BASE_URL, data);
            return response.data;
        } catch (error) {
            console.error('Error registering account:', error);
            return null;
        }
    }
    
    static async login(data: { email: string; password: string }) {
        try {
            const response = await axios.get(`${BASE_URL}?email=${data.email}&password=${data.password}`);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    }
    
    static async getAccountById(roleId: string) {
        try {
            const response = await axios.get(`${BASE_URL}/${roleId}`);
            return response.data;
        } catch (error) {
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
            console.error('Error updating account:', error);
            return null;
        }
    }
    
    static async changePassword(id: string, currentPassword: string, newPassword: string) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}/changePassword`, { currentPassword, newPassword });
            return response.data;
        } catch (error) {
            console.error('Error changing password:', error);
            return null;
        }
    }
    
    static async getAccountsByRole(roleId: number) {
        try {
            const response = await axios.get(`${BASE_URL}/${roleId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching account data:", error);
            return null;
        }
    }
    
    static async updateAccountStatus(id: number, currentStatus: boolean) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, { status: !currentStatus });
            return response.data;
        } catch (error) {
            console.error("Error updating account status:", error);
            return null;
        }
    }

    // Category Management Methods
    static async getCategories(searchQuery = '') {
        try {
            const response = await axios.get(`${CATEGORY_URL}?q=${searchQuery}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    static async addCategory(category: Category) {
        try {
            const response = await axios.post(CATEGORY_URL, category);
            toast.success('Category added successfully');
            return response.data;
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error('Error adding category');
            return null;
        }
    }

    static async updateCategory(id: number, category: Category) {
        try {
            const response = await axios.put(`${CATEGORY_URL}/${id}`, category);
            toast.success('Category updated successfully');
            return response.data;
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Error updating category');
            return null;
        }
    }

    static async deleteCategory(id: number) {
        try {
            const response = await axios.delete(`${CATEGORY_URL}/${id}`);
            toast.success('Category deleted successfully');
            return response.data;
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Error deleting category');
            return null;
        }
    }
}

export default ApiService;
