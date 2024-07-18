// store/slices/companySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contact {
  phone: string;
  isVerified: boolean;
}

interface UserInfo {
  contact: Contact;
  email: string;
  role: string;
}

interface Company {
  _id: string;
  companyName: string;
  companyLogo: string;
  website: string;
  foundedYear: string;
  numberOfEmployees: string;
  sector: string;
  specialty?: string;
  city: string;
  province: string;
  country: string;
  address: string;
  description: string;
  services?: string[];
  skills?: string[];
  companyImages?: string[];
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  userInfo?: {
    contact: {
      phone: string;
      isVerified: boolean;
    };
    email: string;
    role: string;
  };
  languages?: string[];
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
  selectedCompany: Company | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: Pagination;
}

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
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

export const fetchCompanyById = createAsyncThunk<
  Company,
  string,
  { rejectValue: string }
>('company/fetchCompanyById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/company/${id}`);
    console.log("API Response:", response.data);
    return response.data.company;
  } catch (error: any) {
    console.log("API Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred while fetching the company.');
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
      })
      .addCase(fetchCompanyById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanyById.fulfilled, (state, action: PayloadAction<Company>) => {
        state.status = 'succeeded';
        state.selectedCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default companySlice.reducer;
