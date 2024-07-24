import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ajs-server.hostdonor.com/api/v1";

interface Experience {
  from: string;
  to: string;
  onGoing: boolean;
}

interface JobSeeker {
  firstName: string;
  lastName: string;
  profilePicture: string;
  experience?: Experience[];
}

interface Job {
  title: string;
  sector: string;
}

interface JobApplication {
  _id: string;
  job: Job;
  jobSeeker: JobSeeker;
  status: string;
}

interface Pagination {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

interface JobApplicationsState {
  applications: JobApplication[];
  pagination: Pagination;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  applicationDetail: JobApplication | null;
}

const initialState: JobApplicationsState = {
  applications: [],
  pagination: {
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null,
    previousPage: null,
  },
  status: "idle",
  error: null,
  applicationDetail: null,
};

export const fetchAllApplications = createAsyncThunk<
  { allJobApplications: JobApplication[]; pagination: Pagination },
  { companyId: string; token: string },
  { rejectValue: string }
>("jobApplications/fetchAllApplications", async ({ companyId, token }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/job-applications/company/all-applications/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "An error occurred while fetching the applications.");
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const fetchJobApplicationDetail = createAsyncThunk<
  JobApplication,
  { applicationId: string; token: string },
  { rejectValue: string }
>("jobApplications/fetchJobApplicationDetail", async ({ applicationId, token }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/job-applications/company/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "An error occurred while fetching the application details.");
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const shortlistApplication = createAsyncThunk<
  { applicationId: string, shortlisted: boolean },
  { applicationId: string; token: string },
  { rejectValue: string }
>("jobApplications/shortlistApplication", async ({ applicationId, token }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${API_URL}/job-applications/company/shortlist/${applicationId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const alreadyShortlisted = response.data.message === "Job application already shortlisted";
    return { applicationId, shortlisted: !alreadyShortlisted };

  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "An error occurred while shortlisting the application.");
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

export const rejectApplication = createAsyncThunk<
  { applicationId: string },
  { applicationId: string; token: string },
  { rejectValue: string }
>("jobApplications/rejectApplication", async ({ applicationId, token }, { rejectWithValue }) => {
  try {
    await axios.patch(`${API_URL}/job-applications/company/reject-application/${applicationId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { applicationId };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "An error occurred while rejecting the application.");
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

const appliedApplicantSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllApplications.fulfilled, (state, action: PayloadAction<{ allJobApplications: JobApplication[]; pagination: Pagination }>) => {
        state.status = "succeeded";
        state.applications = action.payload.allJobApplications;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchAllApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(fetchJobApplicationDetail.fulfilled, (state, action: PayloadAction<JobApplication>) => {
        state.applicationDetail = action.payload;
      })
      .addCase(shortlistApplication.fulfilled, (state, action: PayloadAction<{ applicationId: string; shortlisted: boolean }>) => {
        state.applications = state.applications.map(application =>
          application._id === action.payload.applicationId ? { ...application, status: action.payload.shortlisted ? "shortlisted" : "pending" } : application
        );
      })
      .addCase(rejectApplication.fulfilled, (state, action: PayloadAction<{ applicationId: string }>) => {
        state.applications = state.applications.filter(application => application._id !== action.payload.applicationId);
      });
  },
});

export default appliedApplicantSlice.reducer;
