// store/slices/companySlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Company {
  _id: string;
  companyName: string;
  companyImages: string[];
  plan: string;
}

interface Pagination {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

interface CompanyState {
  companies: Company[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: Pagination;
}

const initialState: CompanyState = {
  companies: [],
  status: 'idle',
  error: null,
  pagination: {
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null,
    previousPage: null,
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export const fetchCompanies = createAsyncThunk<
  { companies: Company[]; pagination: Pagination },
  { page: number },
  { rejectValue: string }
>('company/fetchCompanies', async ({ page }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/companies?page=${page}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred while fetching companies.');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<{ companies: Company[]; pagination: Pagination }>) => {
        state.status = 'succeeded';
        state.companies = action.payload.companies;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCompanies.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default companySlice.reducer;
