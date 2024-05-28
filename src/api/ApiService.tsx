import axios from 'axios';

class ApiService {

    static async getAccounts() {
        try {
            const response = await axios.get('https://66557e453c1d3b602939b8f1.mockapi.io/Account');
            return response.data;
        } catch (error) {
            console.error('Error fetching reservation data:', error);
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

    static async login(data: { username: string; password: string }) {
        try {
            const response = await axios.get(`https://66557e453c1d3b602939b8f1.mockapi.io/Account?username=${data.username}&password=${data.password}`);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}

export default ApiService;
