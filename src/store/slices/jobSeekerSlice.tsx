import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface JobSeeker {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  // Add any other relevant fields here
}

interface JobSeekersState {
  jobSeekers: JobSeeker[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobSeekersState = {
  jobSeekers: [],
  status: 'idle',
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchJobSeekers = createAsyncThunk<JobSeeker[], void, { rejectValue: string }>(
  'jobSeekers/fetchJobSeekers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-seekers`);
      return response.data; // Adjust according to your API response structure
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while fetching job seekers.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const jobSeekersSlice = createSlice({
  name: 'jobSeekers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobSeekers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobSeekers.fulfilled, (state, action: PayloadAction<JobSeeker[]>) => {
        state.status = 'succeeded';
        state.jobSeekers = action.payload;
      })
      .addCase(fetchJobSeekers.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default jobSeekersSlice.reducer;
