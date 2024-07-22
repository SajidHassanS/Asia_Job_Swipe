import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ajs-server.hostdonor.com/api/v1";
const FILE_URL = process.env.NEXT_PUBLIC_FILE_URL || "https://ajs-files.hostdonor.com/api/v1";

interface Company {
    _id: string;
    companyName: string;
    numberOfEmployees: number;
    foundedYear: number;
    sector: string;
    services: string[];
    email:string;
    city: string;
    province: string;
    country: string;
    address: string;
    website: string;
    description: string;
    languages: string[];
    companyLogo?: string;
    companyImages?: string[];
    phone?: string; // Add this line
    createdAt: string;
    updatedAt: string;
    mediaUrl: string;
    
  }
  

interface CompanyState {
  company: Company | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CompanyState = {
  company: null,
  status: "idle",
  error: null,
};

interface UpdateCompanyArgs {
  id: string;
  updates: Partial<Company>;
  token: string;
}

interface UpdateCompanyLogoArgs {
  companyId: string;
  file: File;
  token: string;
}

interface UpdateCompanyImagesArgs {
  companyId: string;
  files: File[];
  token: string;
}

interface DeleteCompanyFileArgs {
  filename: string;
  token: string;
}

// Function to get token and id from local storage
const getAuthData = () => {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");
  return { token, id };
};

export const fetchCompanyProfile = createAsyncThunk<
  Company,
  string,
  { rejectValue: string }
>("company/fetchCompanyProfile", async (companyId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/company/${companyId}`);
    return response.data.company;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message ||
          "An error occurred while fetching the company profile."
      );
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});


// Thunk to update company profile details
export const updateCompanyProfile = createAsyncThunk<
  Company,
  UpdateCompanyArgs,
  { rejectValue: string }
>("company/updateCompanyProfile", async ({ id, updates, token }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${API_URL}/company/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.company;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message ||
        "An error occurred while updating the company profile."
      );
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

// Thunk to update company logo
export const updateCompanyLogo = createAsyncThunk<
  Company,
  UpdateCompanyLogoArgs,
  { rejectValue: string }
>("company/updateCompanyLogo", async ({ companyId, file, token }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("companyLogo", file);

    const response = await axios.patch(`${FILE_URL}/company-logo/${companyId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.company;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to update company logo."
      );
    } else {
      return rejectWithValue("An unknown error occurred.");
    }
  }
});

// Thunk to delete company logo
export const deleteCompanyLogo = createAsyncThunk<
  { success: boolean },
  DeleteCompanyFileArgs,
  { rejectValue: string }
>("company/deleteCompanyLogo", async ({ filename, token }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${FILE_URL}/company-logo/${filename}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete company logo');
    }

    return { success: true };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "An error occurred while deleting the company logo."
      );
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

// Thunk to update company images
export const updateCompanyImages = createAsyncThunk<
  Company,
  UpdateCompanyImagesArgs,
  { rejectValue: string }
>("company/updateCompanyImages", async ({ companyId, files, token }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    files.forEach(file => formData.append("companyImages", file));

    const response = await axios.patch(`${FILE_URL}/company-images/${companyId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.company;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to update company images."
      );
    } else {
      return rejectWithValue("An unknown error occurred.");
    }
  }
});

// Thunk to delete company images
export const deleteCompanyImages = createAsyncThunk<
  { success: boolean },
  DeleteCompanyFileArgs,
  { rejectValue: string }
>("company/deleteCompanyImages", async ({ filename, token }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${FILE_URL}/company-images/${filename}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete company image');
    }

    return { success: true };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "An error occurred while deleting the company image."
      );
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


    .addCase(fetchCompanyProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCompanyProfile.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.status = "succeeded";
          state.company = action.payload;
          state.error = null;
        }
      )
      .addCase(
        fetchCompanyProfile.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "An unknown error occurred";
        }
      )

      
      .addCase(updateCompanyProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateCompanyProfile.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.status = "succeeded";
          state.company = action.payload;
          state.error = null;
        }
      )
      .addCase(
        updateCompanyProfile.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || "An unknown error occurred";
        }
      )
      .addCase(updateCompanyLogo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateCompanyLogo.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.status = "succeeded";
          if (state.company) {
            state.company.companyLogo = action.payload.companyLogo;
          }
          state.error = null;
        }
      )
      .addCase(
        updateCompanyLogo.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || "An unknown error occurred";
        }
      )
      .addCase(deleteCompanyLogo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteCompanyLogo.fulfilled,
        (state) => {
          state.status = "succeeded";
          if (state.company) {
            state.company.companyLogo = undefined;
          }
          state.error = null;
        }
      )
      .addCase(
        deleteCompanyLogo.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || "An unknown error occurred";
        }
      )
      .addCase(updateCompanyImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateCompanyImages.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.status = "succeeded";
          if (state.company) {
            state.company.companyImages = action.payload.companyImages;
          }
          state.error = null;
        }
      )
      .addCase(
        updateCompanyImages.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || "An unknown error occurred";
        }
      )
      .addCase(deleteCompanyImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteCompanyImages.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          if (state.company) {
            state.company.companyImages = state.company.companyImages?.filter(
              image => image !== action.meta.arg.filename
            );
          }
          state.error = null;
        }
      )
      .addCase(
        deleteCompanyImages.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || "An unknown error occurred";
        }
      );
  },
});

export default companySlice.reducer;
export type { Company };
