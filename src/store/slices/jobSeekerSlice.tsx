import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface JobSeeker {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  skills: string[];
  languages: string[];
  city: string;
  province: string;
  country: string;
  introduction: string;
  gender: string;
  nationality: string;
  postalCode?: string;
  resume?: string;
  openToOffers?: boolean;
  profilePicture?: string;
  education: any[]; // Replace with actual type
  experience: any[]; // Replace with actual type
  projects: any[]; // Replace with actual type
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchProfile = createAsyncThunk<JobSeeker, string, { rejectValue: string }>(
  'profile/fetchProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-seeker/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while fetching the profile.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const updateProfile = createAsyncThunk<JobSeeker, { id: string; updates: Partial<JobSeeker> }, { rejectValue: string }>(
  'profile/updateProfile',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/job-seeker/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return response.data;
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
      })
      .addCase(updateProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default profileSlice.reducer;
