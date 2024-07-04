import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';
import { Job, JobSeekerState } from './types';

interface GetSavedJobsArgs {
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

      console.log('API response:', response.data);

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
        console.log('Fetching saved jobs...');
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
        console.log('State after fetching:', JSON.stringify(state, null, 2));
      })
      .addCase(getSavedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        console.log('Error fetching saved jobs:', state.error);
      });
  },
});

export default jobSeekerSlice.reducer;
