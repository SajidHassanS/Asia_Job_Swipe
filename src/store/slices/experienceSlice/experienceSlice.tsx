// experienceSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export interface Experience {
  _id?: string;
  company: string;
  role: string;
  type: string;
  startDate: string;
  endDate?: string;
  onGoing?: boolean;
  location: string;
  description: string;
  image: string;
}

interface ExperienceState {
  experiences: Experience[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExperienceState = {
  experiences: [],
  status: 'idle',
  error: null,
};

// Thunk to add experience
export const addExperience = createAsyncThunk<Experience, { experience: Experience; jobSeekerId: string; token: string }, { rejectValue: string }>(
  'experience/addExperience',
  async ({ experience, jobSeekerId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/job-seeker/experience`, experience, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          jobSeekerId,
        },
      });
      return response.data.jobSeeker.experience[response.data.jobSeeker.experience.length - 1]; // Assuming the last item is the newly added experience
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while adding the experience.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExperience.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addExperience.fulfilled, (state, action: PayloadAction<Experience>) => {
        state.status = 'succeeded';
        state.experiences.push(action.payload);
        state.error = null;
      })
      .addCase(addExperience.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default experienceSlice.reducer;
