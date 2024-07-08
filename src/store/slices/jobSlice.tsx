import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (page: number) => {
  const response = await axios.get(`${API_URL}/jobs?page=${page}`);
  return response.data;
});

export const fetchSavedJobs = createAsyncThunk('jobs/fetchSavedJobs', async (jobSeekerId: string) => {
  console.log(`Fetching saved jobs for jobSeekerId: ${jobSeekerId}`); // Debug log
  const response = await axios.get(`${API_URL}/jobs/saved-jobs/${jobSeekerId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  console.log('Fetched saved jobs:', response.data); // Debug log
  return response.data.savedJobs; // Ensure this matches the structure in your extraReducers
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
  createdAt: string; // Ensure createdAt or updatedAt field is included
  updatedAt: string; // Ensure createdAt or updatedAt field is included
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
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  savedJobs: [],
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
        console.log('Jobs state updated:', state.jobs); // Debug log
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
        console.error('Fetch jobs error:', state.error); // Debug log
      })
      .addCase(fetchSavedJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Saved jobs payload:', action.payload); // Debug log
        state.savedJobs = action.payload; // Ensure this matches your state structure
        console.log('Saved jobs state updated:', state.savedJobs); // Debug log
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
        console.error('Fetch saved jobs error:', state.error); // Debug log
      });
  },
});

export const { setCurrentPage } = jobSlice.actions;
export default jobSlice.reducer;
