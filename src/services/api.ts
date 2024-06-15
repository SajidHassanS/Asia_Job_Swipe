import axios, { AxiosResponse } from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'https://ajs-server.hostdonor.com/api/v1',
});

// Define the type for the params
interface GoogleOAuthParams {
  code: string;
  state?: string;
  [key: string]: any;
}

// Define the type for the response data
interface GoogleOAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Define the function to handle the Google OAuth callback
export const googleOAuthCallback = async (
  params: GoogleOAuthParams
): Promise<GoogleOAuthResponse> => {
  try {
    const response: AxiosResponse<GoogleOAuthResponse> = await api.get(`/auth/google/callback`, { params });
    return response.data;
  } catch (error) {
    // Refine the type of 'error' to be more specific
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.response?.data?.message || error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Unexpected error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
