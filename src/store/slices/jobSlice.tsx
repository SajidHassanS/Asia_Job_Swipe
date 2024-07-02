import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (page: number) => {
  const response = await axios.get(`${API_URL}/jobs `);
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

interface Pagination {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  prevPage: number;
}

interface JobState {
  jobs: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: Pagination;
}

const initialState: JobState = {
  jobs: [],
  status: 'idle',
  error: null,
  pagination: {
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: 2,
    prevPage: 0,
  },
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    setFilters(state, action) {
      // Handle filters if needed
    },
    setFilteredJobs(state, action) {
      state.jobs = action.payload;
      state.pagination.totalPages = Math.ceil(action.payload.length / 10);
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
        state.pagination = {
          totalPages: action.payload.pagination.totalPages,
          currentPage: action.payload.pagination.currentPage,
          hasNextPage: action.payload.pagination.hasNextPage,
          hasPreviousPage: action.payload.pagination.hasPreviousPage,
          nextPage: action.payload.pagination.nextPage,
          prevPage: action.payload.pagination.prevPage,
        };
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentPage, setFilters, setFilteredJobs } = jobSlice.actions;
export default jobSlice.reducer;
