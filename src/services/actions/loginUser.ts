import axiosInstance from "@/app/api/axiosInstance";
import { API_ENDPOINTS } from "@/app/api/endpoints";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginUser = async (userData: LoginPayload): Promise<any> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGING, userData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Failed to login. Check credentials.');
  }

}