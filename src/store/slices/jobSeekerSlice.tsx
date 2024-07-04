import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';
import { Job, JobSeekerState } from './types';

interface GetSavedJobsArgs {
  jobSeekerId: string;
  accessToken: string;
}

interface ToggleSaveJobArgs {
  jobId: string;
  jobSeekerId: string;
  accessToken: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const getSavedJobs = createAsyncThunk<Job[], GetSavedJobsArgs>(
  'jobSeekers/getSavedJobs',
  async ({ jobSeekerId, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/saved-jobs/${jobSeekerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const savedJobs = response.data.savedJobs.map((item: any) => ({
        _id: item.job._id,
        title: item.job.title,
        company: {
          companyName: item.job.company.companyName,
          companyLogo: item.job.company.companyLogo || '',
        },
        city: item.job.city || '',
        province: item.job.province || '',
        country: item.job.country || '',
        salary: item.job.salary,
        skills: item.job.skills,
        jobType: item.job.jobType,
        careerLevel: item.job.careerLevel,
        description: item.job.description,
        availability: item.job.availability,
        candidateType: item.job.candidateType,
        active: item.job.active,
        createdAt: item.job.createdAt,
        updatedAt: item.job.updatedAt,
      }));

      return savedJobs;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch saved jobs.');
      }
      return rejectWithValue('Failed to fetch saved jobs.');
    }
  }
);

export const toggleSaveJob = createAsyncThunk<string, ToggleSaveJobArgs>(
  'jobSeekers/toggleSaveJob',
  async ({ jobId, jobSeekerId, accessToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/jobs/toggle-job-save`,
        { jobId, jobSeekerId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return jobId; // Return the jobId to identify the job in the reducer
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to toggle save job.');
      }
      return rejectWithValue('Failed to toggle save job.');
    }
  }
);

export const fetchJobById = createAsyncThunk<Job, string>(
  'jobSeekers/fetchJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job/${jobId}`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch job.');
      }
      return rejectWithValue('Failed to fetch job.');
    }
  }
);

const initialState: JobSeekerState = {
  jobSeeker: {
    _id: '',
    savedJobs: [],
  },
  status: 'idle',
  error: null,
};

const jobSeekerSlice = createSlice({
  name: 'jobSeekers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSavedJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSavedJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.status = 'succeeded';
        if (state.jobSeeker) {
          state.jobSeeker.savedJobs = action.payload;
        } else {
          state.jobSeeker = {
            _id: '',
            savedJobs: action.payload,
          };
        }
        state.error = null;
      })
      .addCase(getSavedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(toggleSaveJob.pending, (state) => {
        console.log('Toggling save job...');
      })
      .addCase(toggleSaveJob.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.jobSeeker) {
          const jobId = action.payload;
          const jobIndex = state.jobSeeker.savedJobs.findIndex((job) => job._id === jobId);
          if (jobIndex >= 0) {
            state.jobSeeker.savedJobs.splice(jobIndex, 1);
          } else {
            state.jobSeeker.savedJobs.push({ _id: jobId } as Job);
          }
        } else {
          console.error('jobSeeker is null');
        }
      })
      .addCase(toggleSaveJob.rejected, (state, action) => {
        console.log('Error toggling save job:', action.payload);
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        if (state.jobSeeker) {
          state.jobSeeker.savedJobs.push(action.payload);
        } else {
          console.error('jobSeeker is null');
        }
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        console.log('Error fetching job:', action.payload);
      });
  },
});

export default jobSeekerSlice.reducer;
