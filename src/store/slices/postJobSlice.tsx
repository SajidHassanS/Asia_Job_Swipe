import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

interface JobState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobState = {
  status: 'idle',
  error: null,
};

export const postJob = createAsyncThunk(
  'jobs/postJob',
  async (jobData: any, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error("No authorization token found");
      return rejectWithValue('No authorization token found');
    }

    try {
      console.log("API URL:", API_URL); // Debug logging
      console.log("Sending job data:", jobData); // Debug logging
      const response = await axios.post(`${API_URL}/jobs`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log("Job post response:", response.data); // Debug logging
      return response.data;
    } catch (error: any) {
      console.error("Error posting job:", error); // Debug logging
      if (axios.isAxiosError(error) && error.response) {
        console.error("Axios error response:", error.response); // Debug logging
        return rejectWithValue(error.response.data.message || 'An error occurred while posting the job.');
      } else {
        console.error("Non-Axios error:", error); // Debug logging
        return rejectWithValue(error.message || 'An unknown error occurred');
      }
    }
  }
);

const postJobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postJob.pending, (state) => {
        console.log("postJob pending"); // Debug logging
        state.status = 'loading';
      })
      .addCase(postJob.fulfilled, (state) => {
        console.log("postJob fulfilled"); // Debug logging
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(postJob.rejected, (state, action: PayloadAction<any>) => {
        console.log("postJob rejected", action.payload); // Debug logging
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default postJobSlice.reducer;
