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
  errors: { path: string; message: string }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  otpStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  otpError: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  jobSeekerId: string | null; 
}

const initialState: AuthState = {
  user: null,
  emailForSignUp: null,
  otpForSignUp: null,
  status: 'idle',
  error: null,
  errors: [],
  otpStatus: 'idle',
  otpError: null,
  accessToken: null,
  refreshToken: null,
  role: null,
  jobSeekerId: null, 
};

interface AuthError {
  path: string;
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const registerJobSeeker = createAsyncThunk<User, { email: string; password: string; firstName: string; lastName: string; otp: string; role: string }, { rejectValue: AuthError[] }>(
  'auth/registerJobSeeker',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/job-seeker`, userData);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', 'jobseeker');
      localStorage.setItem('_id', response.data.user._id);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      return response.data.user; // Adjust the return value to only include user data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        }
        if (error.response.data.message) {
          return rejectWithValue([{ path: 'unknown', message: error.response.data.message }]);
        }
      }
      return rejectWithValue([{ path: 'unknown', message: 'An unknown error occurred' }]);
    }
  }
);

export const registerCompany = createAsyncThunk<User, { email: string; password: string; otp: string; role: string; companyName: string }, { rejectValue: AuthError[] }>(
  'auth/registerCompany',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/company`, userData);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', 'company');
      localStorage.setItem('_id', response.data.user._id);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      return response.data.user; // Adjust the return value to only include user data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        }
        if (error.response.data.message) {
          return rejectWithValue([{ path: 'unknown', message: error.response.data.message }]);
        }
      }
      return rejectWithValue([{ path: 'unknown', message: 'An unknown error occurred' }]);
    }
  }
);

export const sendOTP = createAsyncThunk<void, { email: string }, { rejectValue: AuthError[] }>(
  'auth/sendOTP',
  async ({ email }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/auth/send-otp`, { email });
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        }
        if (error.response.data.message) {
          return rejectWithValue([{ path: 'unknown', message: error.response.data.message }]);
        }
      }
      return rejectWithValue([{ path: 'unknown', message: 'An unknown error occurred' }]);
    }
  }
);

export const verifyOTP = createAsyncThunk<void, { email: string; otp: string }, { rejectValue: AuthError[] }>(
  'auth/verifyOTP',
  async ({ email, otp }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/auth/verify-otp`, { email, otp: Number(otp) });
      dispatch(setEmailForSignUp(email));
      dispatch(setOtpForSignUp(otp));
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        }
        if (error.response.data.message) {
          return rejectWithValue([{ path: 'unknown', message: error.response.data.message }]);
        }
      }
      return rejectWithValue([{ path: 'unknown', message: 'An unknown error occurred' }]);
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: AuthError[] }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      localStorage.removeItem('_id');
      localStorage.removeItem('userInfo');
      return;
    } catch (error: any) {
      return rejectWithValue([{ path: 'unknown', message: error.message || 'An error occurred during logout.' }]);
    }
  }
);

export const signIn = createAsyncThunk<User, { email: string; password: string; userType: string }, { rejectValue: AuthError[] }>(
  'auth/login',
  async ({ email, password, userType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const user = response.data.user;

      if (user.userInfo.role !== userType) {
        return rejectWithValue([{ path: 'userType', message: 'Unauthorized: role mismatch' }]);
      }

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', user.userInfo.role);
      localStorage.setItem('_id', user._id);
      localStorage.setItem('userInfo', JSON.stringify({ ...user.userInfo, firstName: user.firstName, lastName: user.lastName }));

      return { ...user.userInfo, _id: user._id, firstName: user.firstName, lastName: user.lastName };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        }
        if (error.response.data.message) {
          return rejectWithValue([{ path: 'unknown', message: error.response.data.message }]);
        }
      }
      return rejectWithValue([{ path: 'unknown', message: 'An unknown error occurred' }]);
    }
  }
);

export const googleSignIn = createAsyncThunk<User, { code: string; role: string }, { rejectValue: AuthError[] }>(
  'auth/googleSignIn',
  async ({ code, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, { code, role });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      return response.data.user; // Adjust the return value to only include user data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        }
        if (error.response.data.message) {
          return rejectWithValue([{ path: 'unknown', message: error.response.data.message }]);
        }
      }
      return rejectWithValue([{ path: 'unknown', message: 'An unknown error occurred' }]);
    }
  }
);

export const initializeAuth = createAsyncThunk<void, void, { rejectValue: AuthError[] }>(
  'auth/initializeAuth',
  async (_, { dispatch }) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const role = localStorage.getItem('role');
    const _id = localStorage.getItem('_id');
    const userInfo = localStorage.getItem('userInfo');

    if (accessToken && refreshToken && role && _id && userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setUser({ ...user, _id }));
    }
  }
);

export const sendForgotPasswordOTP = createAsyncThunk<void, { email: string }, { rejectValue: string }>(
  'auth/sendForgotPasswordOTP',
  async ({ email }, { rejectWithValue }) => {
    try {
      console.log('Making API call to send OTP'); // Log before API call
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      console.log('OTP sent successfully'); // Log success
    } catch (error: any) {
      console.log('Error sending OTP:', error); // Log error
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to send OTP.');
      }
      return rejectWithValue('Failed to send OTP.');
    }
  }
);

export const resetPassword = createAsyncThunk<void, { email: string; otp: string; newPassword: string }, { rejectValue: string }>(
  'auth/resetPassword',
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/auth/reset-password`, { email, otp, newPassword });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to reset password.');
      }
      return rejectWithValue('Failed to reset password.');
    }
  }
);



export const loginCompanyRole = createAsyncThunk<User, { email: string; password: string }, { rejectValue: AuthError[] }>(
  'auth/loginCompanyRole',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/company-role`, { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('_id', response.data.user._id);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      return response.data.user; // Adjust the return value to only include user data
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          return rejectWithValue(error.response.data.errors);
        }
        if (error.response.data.message) {
          return rejectWithValue([{ path: 'unknown', message: error.response.data.message }]);
        }
      }
      return rejectWithValue([{ path: 'unknown', message: 'An unknown error occurred' }]);
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
      state.jobSeekerId = action.payload.role === 'jobseeker' ? action.payload._id : null;
    },
    signOut: (state: AuthState) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.jobSeekerId = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      localStorage.removeItem('_id');
      localStorage.removeItem('userInfo');
    },
    setEmailForSignUp: (state: AuthState, action: PayloadAction<string>) => {
      state.emailForSignUp = action.payload;
    },
    clearErrors: (state: AuthState) => {
      state.errors = [];
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
      // Add extra reducers for loginCompanyRole
      .addCase(loginCompanyRole.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(loginCompanyRole.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.role = action.payload.role || null;
        state.errors = [];
        state.jobSeekerId = action.payload.role === 'jobseeker' ? action.payload._id : null;
      })
      .addCase(loginCompanyRole.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.status = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })

      // existing cases remain unchanged
      .addCase(logout.pending, (state: AuthState) => {
        // Handle any pending actions related to logout if needed
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.jobSeekerId = null;
      })
      .addCase(logout.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(registerJobSeeker.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(registerJobSeeker.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.jobSeekerId = action.payload._id;
      })
      .addCase(registerJobSeeker.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.status = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(registerCompany.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(registerCompany.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.jobSeekerId = action.payload.role === 'jobseeker' ? action.payload._id : null;
      })
      .addCase(registerCompany.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.status = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(signIn.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.role = action.payload.role || null;
        state.errors = [];
        state.jobSeekerId = action.payload.role === 'jobseeker' ? action.payload._id : null;
      })
      .addCase(signIn.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.status = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(sendOTP.pending, (state: AuthState) => {
        state.otpStatus = 'loading';
      })
      .addCase(sendOTP.fulfilled, (state: AuthState) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(sendOTP.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.otpStatus = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(verifyOTP.pending, (state: AuthState) => {
        state.otpStatus = 'loading';
      })
      .addCase(verifyOTP.fulfilled, (state: AuthState) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(verifyOTP.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.otpStatus = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(initializeAuth.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(initializeAuth.fulfilled, (state: AuthState) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.status = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(googleSignIn.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(googleSignIn.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.jobSeekerId = action.payload.role === 'jobseeker' ? action.payload._id : null;
      })
      .addCase(googleSignIn.rejected, (state: AuthState, action: PayloadAction<AuthError[] | undefined>) => {
        state.status = 'failed';
        state.errors = action.payload || [{ path: 'unknown', message: 'An unknown error occurred' }];
      })
      .addCase(sendForgotPasswordOTP.pending, (state: AuthState) => {
        state.otpStatus = 'loading';
      })
      .addCase(sendForgotPasswordOTP.fulfilled, (state: AuthState) => {
        state.otpStatus = 'succeeded';
        state.otpError = null;
      })
      .addCase(sendForgotPasswordOTP.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload || 'An unknown error occurred';
      })
      .addCase(resetPassword.pending, (state: AuthState) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state: AuthState) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { setUser, signOut, clearErrors, setEmailForSignUp, setOtpForSignUp, setTokens } = authSlice.actions;

export default authSlice.reducer;


//this is my rough comment
// just comment