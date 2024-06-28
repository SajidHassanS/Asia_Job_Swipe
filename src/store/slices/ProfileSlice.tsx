import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

interface JobSeeker {
  _id: string;
  firstName: string;
  lastName: string;
  profession?: string;
  city?: string;
  country?: string;
  introduction?: string;
  [key: string]: any;
}

interface ProfileState {
  jobSeeker: JobSeeker | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  jobSeeker: null,
  status: 'idle',
  error: null,
};

export const fetchProfile = createAsyncThunk<JobSeeker, { id: string; token: string }, { rejectValue: string }>(
  'profile/fetchProfile',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-seeker/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.jobSeeker;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while fetching the profile.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const updateProfile = createAsyncThunk<JobSeeker, { id: string; updates: Partial<JobSeeker>; token: string }, { rejectValue: string }>(
  'profile/updateProfile',
  async ({ id, updates, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/job-seeker/${id}`, updates, {
       
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, 'responsexxxx');
      return response.data.jobSeeker;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while updating the profile.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<JobSeeker>) => {
        state.status = 'succeeded';
        state.jobSeeker = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<JobSeeker>) => {
        state.status = 'succeeded';
        state.jobSeeker = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default profileSlice.reducer;
