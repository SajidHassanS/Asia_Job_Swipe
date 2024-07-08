import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

interface JobSeeker {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  skills: string[];
  languages: string[];
  openToOffers: boolean;
  education: any[]; // Update with actual type
  experience: any[]; // Update with actual type
  projects: any[]; // Update with actual type
  createdAt: string;
  updatedAt: string;
  __v: number;
  dateOfBirth: string;
  introduction: string;
  profession?: string; // Add these optional properties
  city?: string;
  country?: string;
  profilePicture?: string;
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

// Thunk to fetch job seeker profile
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

// Thunk to update job seeker profile details
export const updateProfile = createAsyncThunk<JobSeeker, { id: string; updates: Partial<JobSeeker>; token: string }, { rejectValue: string }>(
  'profile/updateProfile',
  async ({ id, updates, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/job-seeker/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

// Thunk to update job seeker profile picture
export const updateProfilePicture = createAsyncThunk<JobSeeker, { id: string; file: File; token: string }, { rejectValue: string }>(
  'profile/updateProfilePicture',
  async ({ id, file, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.patch(`${API_URL}/files/job-seeker/profile-picture/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.jobSeeker;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while updating the profile picture.');
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
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfilePicture.fulfilled, (state, action: PayloadAction<JobSeeker>) => {
        state.status = 'succeeded';
        state.jobSeeker = action.payload;
        state.error = null;
      })
      .addCase(updateProfilePicture.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default profileSlice.reducer;
