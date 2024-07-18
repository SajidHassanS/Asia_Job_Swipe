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

interface ApplyForJobArgs {
  jobId: string;
  jobSeekerId: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';
const getAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};
export const getSavedJobs = createAsyncThunk<Job[], GetSavedJobsArgs>(
  'jobSeekers/getSavedJobs',
  async ({ jobSeekerId }, { rejectWithValue }) => {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Access token is missing');
    }

    try {
      const response = await axios.get(`${API_URL}/jobs/saved-jobs/${jobSeekerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedJobs = response.data.savedJobs.map((item: any) => ({
        _id: item.job._id,
        title: item.job.title,
        company: {
          companyName: item.job.company.companyName,
          companyLogo: item.job.company.companyLogo || '',
          city: item.job.company.city || '',
          province: item.job.company.province || '',
          country: item.job.company.country || '',
        },
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
        console.error('API Error:', error.response.data); // Logging the error response
        return rejectWithValue(error.response.data.message || 'Failed to fetch saved jobs.');
      }
      console.error('Unknown Error:', error); // Logging unknown errors
      return rejectWithValue('Failed to fetch saved jobs.');
    }
  }
);



export const toggleSaveJob = createAsyncThunk<string, ToggleSaveJobArgs>(
  'jobSeekers/toggleSaveJob',
  async ({ jobId, jobSeekerId }, { rejectWithValue }) => {
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Access token is missing');
    }

    try {
      await axios.post(
        `${API_URL}/jobs/toggle-job-save`,
        { jobId, jobSeekerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    const token = getAuthToken();
    if (!token) {
      return rejectWithValue('Access token is missing');
    }

    try {
      const response = await axios.get(`${API_URL}/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data); // Logging the response for debugging
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('API Error:', error.response.data); // Logging the error response
        return rejectWithValue(error.response.data.message || 'Failed to fetch job.');
      }
      console.error('Unknown Error:', error); // Logging unknown errors
      return rejectWithValue('Failed to fetch job.');
    }
  }
);

export const applyForJob = createAsyncThunk<void, ApplyForJobArgs>(
  'jobSeekers/applyForJob',
  async ({ jobId, jobSeekerId }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${API_URL}/job-applications/job-seeker/apply`,
        { jobId, jobSeekerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to apply for job.');
      }
      return rejectWithValue('Failed to apply for job.');
    }
  }
);

const initialState: JobSeekerState = {
  jobSeeker: {
    _id: '',
    savedJobs: [],
    appliedJobs: [],
  },
  status: 'idle',
  error: null,
  applyError: null,
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
        if (state.jobSeeker) {
          state.jobSeeker.savedJobs = action.payload;
        } else {
          state.jobSeeker = {
            _id: '',
            savedJobs: action.payload,
            appliedJobs: [],
          };
        }
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(getSavedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
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
        }
      })
      .addCase(applyForJob.pending, (state) => {
        state.applyError = null;
      })
      .addCase(applyForJob.fulfilled, (state) => {
        // No need to change the state here if it doesn't affect savedJobs
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.applyError = action.payload as string;
      });
  },
});

export default jobSeekerSlice.reducer;
