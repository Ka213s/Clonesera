import axios from 'axios';
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
}
class ApiService {
    static async saveGoogleUserData(userData: UserData): Promise<void> {
        try {
            await axios.post('https://66557e453c1d3b602939b8f1.mockapi.io/Account', userData);
        } catch (error) {
            throw new Error('Error saving user data to API');
        }
    }
    static async getAccounts(role: string) {
        try {
            const response = await axios.get(`https://66557e453c1d3b602939b8f1.mockapi.io/Account?roleId=${role}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching account data:', error);
            return null;
        }
    }

    static async registerAccount(data: any) {
        try {
            const response = await axios.post('https://66557e453c1d3b602939b8f1.mockapi.io/Account', data);
            return response.data;
        } catch (error) {
            console.error('Error registering account:', error);
            throw error;
        }
    }

    static async login(data: { email: string; password: string }) {
        try {
            const response = await axios.get(`https://66557e453c1d3b602939b8f1.mockapi.io/Account?email=${data.email}&password=${data.password}`);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    static async getAccountById(roleId: string) {
        try {
            const response = await axios.get(`https://66557e453c1d3b602939b8f1.mockapi.io/Account/${roleId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching account data:', error);
            throw error;
        }
    }

    static async updateAccount(id: string, data: any) {
        try {
            const response = await axios.put(`https://66557e453c1d3b602939b8f1.mockapi.io/Account/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating account:', error);
            throw error;
        }
    }

    static async changePassword(id: string, currentPassword: string, newPassword: string) {
        try {
            const response = await axios.put(`https://66557e453c1d3b602939b8f1.mockapi.io/Account/${id}/changePassword`, { currentPassword, newPassword });
            return response.data;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    }
}

export default ApiService;
