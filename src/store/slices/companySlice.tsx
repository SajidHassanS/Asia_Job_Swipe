// src/store/slices/companySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Company {
  _id: string;
  companyName: string;
  plan: string;
  userInfo: {
    email: string;
    role: string;
  } | null;
  companyImages: string[];
  createdAt: string;
  updatedAt: string;
}

interface CompanyState {
  companies: Company[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
}

const initialState: CompanyState = {
  companies: [],
  status: 'idle',
  error: null,
  total: 0,
  currentPage: 1,
  totalPages: 1,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchCompanies = createAsyncThunk<
  { companies: Company[], total: number, totalPages: number },
  { page: number },
  { rejectValue: string }
>(
  'company/fetchCompanies',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/companies`, {
        params: { page },
      });
      return {
        companies: response.data.companies,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while fetching companies.');
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<{ companies: Company[], total: number, totalPages: number }>) => {
        state.status = 'succeeded';
        state.companies = action.payload.companies;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchCompanies.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default companySlice.reducer;
