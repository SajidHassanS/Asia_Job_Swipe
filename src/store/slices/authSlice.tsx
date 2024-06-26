import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
 // Adjust the import paths according to your project structure

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

export const registerJobSeeker = createAsyncThunk<User, { email: string; password: string; firstName: string; lastName: string; otp: string; role: string }, { rejectValue: string }>(
  'auth/registerJobSeeker',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/job-seeker`, userData);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', 'jobseeker');
      localStorage.setItem('_id', response.data.user._id);
      return response.data.user; // Adjust the return value to only include user data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during job seeker registration.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const registerCompany = createAsyncThunk<User, { email: string; password: string;  otp: string; role: string; companyName: string }, { rejectValue: string }>(
  'auth/registerCompany',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/company`, userData);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', 'company');
      localStorage.setItem('_id', response.data.user._id);
      return response.data.user; // Adjust the return value to only include user data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during company registration.');
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


export const signIn = createAsyncThunk<User, { email: string; password: string; userType: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password, userType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const user = response.data.user.userInfo;

      if (user.role !== userType) {
        return rejectWithValue('Unauthorized: role mismatch');
      }

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', user.role);
      localStorage.setItem('_id', user._id);

      return user;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during sign-in.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);



export const googleSignIn = createAsyncThunk<User, { code: string; role: string }, { rejectValue: string }>(
  'auth/googleSignIn',
  async ({ code, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, { code, role });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data.user; // Adjust the return value to only include user data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during Google sign-in.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);



export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { dispatch, rejectWithValue }) => {
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
        dispatch(setTokens({ accessToken, refreshToken }));
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        return rejectWithValue('Failed to fetch user profile');
      }
    } else {
      return rejectWithValue('No tokens found');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.role = action.payload.role || null;
    },
    signOut: (state: AuthState) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      localStorage.removeItem('_id');
    },
    setEmailForSignUp: (state: AuthState, action: PayloadAction<string>) => {
      state.emailForSignUp = action.payload;
    },
    setOtpForSignUp: (state: AuthState, action: PayloadAction<string>) => {
      state.otpForSignUp = action.payload;
    },
    setTokens: (state: AuthState, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state: AuthState) => {
        // Handle any pending actions related to logout if needed
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logout.rejected, (state: AuthState, action) => {
        // Handle any errors during logout if needed
        state.error = action.error.message || 'An unknown error occurred';
      })
      .addCase(registerJobSeeker.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(registerJobSeeker.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerJobSeeker.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(registerCompany.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(registerCompany.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerCompany.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(signIn.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.role = action.payload.role || null;
        state.error = null;
      })
      .addCase(signIn.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(sendOTP.pending, (state: AuthState) => {
        state.otpStatus = 'loading';
      })
      .addCase(sendOTP.fulfilled, (state: AuthState) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(sendOTP.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload || 'An unknown error occurred';
      })
      .addCase(verifyOTP.pending, (state: AuthState) => {
        state.otpStatus = 'loading';
      })
      .addCase(verifyOTP.fulfilled, (state: AuthState) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(verifyOTP.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload || 'An unknown error occurred';
      })
      .addCase(initializeAuth.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(initializeAuth.fulfilled, (state: AuthState) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state: AuthState, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An unknown error occurred';
      })
      .addCase(googleSignIn.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(googleSignIn.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleSignIn.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { setUser, signOut, setEmailForSignUp, setOtpForSignUp, setTokens } = authSlice.actions;

export default authSlice.reducer;
// Ensure googleSignIn is only exported once
