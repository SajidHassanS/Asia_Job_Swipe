import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Job {
  jobId: string;
  companyName: string;
  icon: string;
  role: string;
  dateApplied: string;
  status: string;
}

interface AppliedJobState {
  jobs: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppliedJobState = {
  jobs: [],
  status: 'idle',
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchAppliedJobs = createAsyncThunk<Job[], string>(
  'appliedJobs/fetchAppliedJobs',
  async (jobSeekerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-applications/job-seeker/all-applications/${jobSeekerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return response.data.appliedJobs.map((job: any) => ({
        jobId: job._id,
        companyName: job.company.companyName, // Change this to job.job.companyName if available
        icon: '/path/to/default/icon.png', // Adjust this if you have actual icons
        role: job.job.title,
        dateApplied: new Date(job.createdAt).toLocaleDateString(),
        status: job.status,
      }));
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch applied jobs.');
      }
      return rejectWithValue('Failed to fetch applied jobs.');
    }
  }
);

const appliedJobSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default appliedJobSlice.reducer;
