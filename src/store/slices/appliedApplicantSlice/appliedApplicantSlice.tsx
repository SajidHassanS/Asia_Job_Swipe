import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ajs-server.hostdonor.com/api/v1";

interface JobApplication {
  _id: string;
  jobId: string;
  companyId: string;
  applicantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface JobApplicationState {
  applications: JobApplication[];
  applicationDetails: JobApplication | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JobApplicationState = {
  applications: [],
  applicationDetails: null,
  status: "idle",
  error: null,
};

export const fetchAllApplications = createAsyncThunk<
  JobApplication[],
  { companyId: string; token: string },
  { rejectValue: string }
>(
  "jobApplications/fetchAllApplications",
  async ({ companyId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-applications/company/all-applications/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.applications;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred while fetching the applications."
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchApplicationsOnJob = createAsyncThunk<
  JobApplication[],
  { jobId: string; token: string },
  { rejectValue: string }
>(
  "jobApplications/fetchApplicationsOnJob",
  async ({ jobId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-applications/company/applications-on-job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.applications;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred while fetching the applications on the job."
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchApplicationDetails = createAsyncThunk<
  JobApplication,
  { applicationId: string; token: string },
  { rejectValue: string }
>(
  "jobApplications/fetchApplicationDetails",
  async ({ applicationId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-applications/company/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.application;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred while fetching the application details."
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const rejectApplication = createAsyncThunk<
  { message: string },
  { applicationId: string; token: string },
  { rejectValue: string }
>(
  "jobApplications/rejectApplication",
  async ({ applicationId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/job-applications/company/reject-application/${applicationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred while rejecting the application."
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const acceptApplication = createAsyncThunk<
  { message: string },
  { applicationId: string; token: string },
  { rejectValue: string }
>(
  "jobApplications/acceptApplication",
  async ({ applicationId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/job-applications/company/accept-application/${applicationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred while accepting the application."
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const shortlistApplication = createAsyncThunk<
  { message: string },
  { applicationId: string; token: string },
  { rejectValue: string }
>(
  "jobApplications/shortlistApplication",
  async ({ applicationId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/job-applications/company/shortlist/${applicationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred while shortlisting the application."
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchShortlistedApplications = createAsyncThunk<
  JobApplication[],
  { companyId: string; token: string },
  { rejectValue: string }
>(
  "jobApplications/fetchShortlistedApplications",
  async ({ companyId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/job-applications/company/shortlisted/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.applications;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred while fetching the shortlisted applications."
        );
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const appliedApplicantSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllApplications.fulfilled, (state, action: PayloadAction<JobApplication[]>) => {
        state.status = "succeeded";
        state.applications = action.payload;
        state.error = null;
      })
      .addCase(fetchAllApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(fetchApplicationsOnJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplicationsOnJob.fulfilled, (state, action: PayloadAction<JobApplication[]>) => {
        state.status = "succeeded";
        state.applications = action.payload;
        state.error = null;
      })
      .addCase(fetchApplicationsOnJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(fetchApplicationDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplicationDetails.fulfilled, (state, action: PayloadAction<JobApplication>) => {
        state.status = "succeeded";
        state.applicationDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchApplicationDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(rejectApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rejectApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(rejectApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(acceptApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(acceptApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(acceptApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(shortlistApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(shortlistApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(shortlistApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(fetchShortlistedApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShortlistedApplications.fulfilled, (state, action: PayloadAction<JobApplication[]>) => {
        state.status = "succeeded";
        state.applications = action.payload;
        state.error = null;
      })
      .addCase(fetchShortlistedApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

export default appliedApplicantSlice.reducer;
