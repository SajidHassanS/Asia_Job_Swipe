import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (page: number) => {
  const response = await axios.get(`${API_URL}/jobs?page=${page}`);
  return response.data;
});

interface Job {
  _id: string;
  title: string;
  company: {
    companyLogo: string;
    companyName: string;
    city: string;
    province: string;
    country: string;
  };
  salary: {
    from: number;
    to: number;
  };
  skills: string[];
  jobType: string;
  city: string;
  province: string;
  country: string;
}

interface JobState {
  jobs: Job[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  totalJobs: 0,
  totalPages: 0,
  currentPage: 1,
  status: 'idle',
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.total;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentPage } = jobSlice.actions;
export default jobSlice.reducer;
