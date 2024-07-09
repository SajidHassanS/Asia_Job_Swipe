import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (page: number) => {
  const response = await axios.get(`${API_URL}/jobs?page=${page}`);
  return response.data;
});

export const fetchSavedJobs = createAsyncThunk('jobs/fetchSavedJobs', async (jobSeekerId: string) => {
  const response = await axios.get(`${API_URL}/jobs/saved-jobs/${jobSeekerId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  return response.data.savedJobs;
});

export const fetchJobById = createAsyncThunk('jobs/fetchJobById', async (jobId: string) => {
  const response = await axios.get(`${API_URL}/job/${jobId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  return response.data.job;
});

interface Company {
  companyLogo: string;
  companyName: string;
  city: string;
  province: string;
  country: string;
  sector: string;
}

interface Salary {
  from: number;
  to: number;
}

interface Job {
  _id: string;
  title: string;
  company: Company;
  salary: Salary;
  skills: string[];
  jobType: string;
  city: string;
  province: string;
  country: string;
  availability: string;
  careerLevel: string;
  candidateType: string;
  createdAt: string;
  updatedAt: string;
  description: string; // Add this line
  sector: string; // Add this line
  active: boolean; // Ensure this is included
}

interface SavedJob {
  _id: string;
  jobSeeker: {
    _id: string;
    firstName: string;
    lastName: string;
    gender: string;
    introduction: string;
    dateOfBirth: string;
    userInfo: string;
  };
  job: Job;
}

interface JobState {
  jobs: Job[];
  savedJobs: SavedJob[];
  job: Job | null;
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  savedJobs: [],
  job: null,
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
        state.jobs = action.payload.jobs.sort((a: Job, b: Job) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        state.totalJobs = action.payload.total;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchSavedJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.savedJobs = action.payload;
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.job = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentPage } = jobSlice.actions;
export default jobSlice.reducer;
