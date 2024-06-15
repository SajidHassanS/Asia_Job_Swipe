import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  emailForSignUp: string | null;
  otpForSignUp: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  otpStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  otpError: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  emailForSignUp: null,
  otpForSignUp: null,
  status: 'idle',
  error: null,
  otpStatus: 'idle',
  otpError: null,
  accessToken: null,
  refreshToken: null,
  role: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

// export const signIn = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
//   'auth/signin',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/signin`, credentials);
//       return response.data;
//     } catch (error: any) {
//       if (axios.isAxiosError(error) && error.response) {
//         return rejectWithValue(error.response.data.message || 'An error occurred during sign-in.');
//       } else {
//         return rejectWithValue('An unknown error occurred');
//       }
//     }
//   }
// );

export const signIn = createAsyncThunk<User, { email: string; password: string; userType: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password, userType }, { rejectWithValue }) => {
    let url = `${API_URL}/auth/login`; // Default route for jobSeeker and company
    if (userType === 'companyRole') {
      url = `${API_URL}/auth/login/company-role`;
    } else if (userType === 'admin') {
      url = `${API_URL}/auth/login/admin`;
    }  

    try {
      const response = await axios.post(url, { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('Login response:', response.data.accessToken);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during sign-in.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);
export const registerJobSeeker = createAsyncThunk<User, { email: string; password: string; firstName: string; lastName: string; otp: string ,role: string }, { rejectValue: string }>(
  'auth/registerJobSeeker',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/job-seeker`, userData);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during job seeker registration.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const registerCompanyRole = createAsyncThunk<User, { email: string; password: string; firstName: string; lastName: string; role: string }, { rejectValue: string }>(
  'auth/registerCompanyRole',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/company-role`, userData);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during company role registration.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const googleSignIn = createAsyncThunk<{ user: User; accessToken: string; refreshToken: string }, { code: string, role: string }, { rejectValue: string }>(
  'auth/googleSignIn',
  async ({ code, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, { code, role });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during Google sign-in.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const sendOTP = createAsyncThunk<void, { email: string }, { rejectValue: string }>(
  'auth/sendOTP',
  async ({ email }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/auth/send-otp`, { email });
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while sending OTP.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const verifyOTP = createAsyncThunk<void, { email: string; otp: string }, { rejectValue: string }>(
  'auth/verifyOTP',
  async ({ email, otp }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/auth/verify-otp`, { email, otp: Number(otp) });
      dispatch(setEmailForSignUp(email));
      dispatch(setOtpForSignUp(otp));
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while verifying OTP.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


export const initializeAuth = createAsyncThunk('auth/initializeAuth', async (_, { dispatch }) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(setUser(response.data));
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred during logout.');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setEmailForSignUp: (state, action: PayloadAction<string>) => {
      state.emailForSignUp = action.payload;
    },
    setOtpForSignUp: (state, action: PayloadAction<string>) => {
      state.otpForSignUp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        // Handle any pending actions related to logout if needed
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<string | undefined>) => {
        // Handle any errors during logout if needed
      })
      .addCase(registerJobSeeker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerJobSeeker.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerJobSeeker.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(registerCompanyRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerCompanyRole.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerCompanyRole.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(sendOTP.pending, (state) => {
        state.otpStatus = 'loading';
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(sendOTP.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload || 'An unknown error occurred';
      })
      .addCase(verifyOTP.pending, (state) => {
        state.otpStatus = 'loading';
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(verifyOTP.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload || 'An unknown error occurred';
      })
      .addCase(googleSignIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(googleSignIn.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(googleSignIn.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { setUser, signOut, setEmailForSignUp, setOtpForSignUp } = authSlice.actions;

export default authSlice.reducer;
