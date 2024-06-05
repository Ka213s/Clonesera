import axios from "axios";

class ApiService {
  static async getAccounts() {
    try {
      const response = await axios.get(
        "https://66557e453c1d3b602939b8f1.mockapi.io/Account"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching account data:", error);
      return null;
    }
  }

  static async registerAccount(data: any) {
    try {
      const response = await axios.post(
        "https://66557e453c1d3b602939b8f1.mockapi.io/Account",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error registering account:", error);
      throw error;
    }
  }

  static async login(data: { email: string; password: string }) {
    try {
      const response = await axios.get(
        `https://66557e453c1d3b602939b8f1.mockapi.io/Account?email=${data.email}&password=${data.password}`
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  static async getAccountsByRole(roleId: number) {
    try {
      const response = await axios.get(
        "https://66557e453c1d3b602939b8f1.mockapi.io/Account"
      );
      return response.data.filter((account: any) => account.roleId === roleId);
    } catch (error) {
      console.error("Error fetching account data:", error);
      return null;
    }
  }

  static async updateAccountStatus(id: number, currentStatus: boolean) {
    try {
      const response = await axios.put(
        `https://66557e453c1d3b602939b8f1.mockapi.io/Account/${id}`,
        {
          status: !currentStatus,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating account status:", error);
      return null;
    }
  }

  static async updateAccount(id: string, data: any) {
    try {
      const response = await axios.put(
        `https://66557e453c1d3b602939b8f1.mockapi.io/Account/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating account:", error);
      return null;
    }
  }
}

export default ApiService;
