import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import socket from '@/services/socket';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
}

interface JobSeeker {
  _id: string;
  userInfo: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface JobApplication {
  _id: string;
  jobSeeker: JobSeeker;
}

interface Chat {
  _id: string;
  participants: string[];
  messages: Message[];
}

interface MessagesState {
  chats: Chat[];
  messages: Message[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  jobApplication: JobApplication | null;
}

const initialState: MessagesState = {
  chats: [],
  messages: [],
  status: 'idle',
  error: null,
  jobApplication: null,
};

export const fetchJobApplicationDetail = createAsyncThunk<
  JobApplication,
  { applicationId: string; token: string },
  { rejectValue: string }
>('message/fetchJobApplicationDetail', async ({ applicationId, token }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/job-applications/company/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.jobApplication;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred while fetching the job application details.');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

export const fetchMessages = createAsyncThunk<
  Message[],
  { receiverId: string; token: string },
  { rejectValue: string }
>('message/fetchMessages', async ({ receiverId, token }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/chats/messages/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.messages; // Ensure we return the correct data structure
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred while fetching the messages.');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

export const sendMessage = createAsyncThunk<
  Message,
  { receiverId: string; message: string; token: string },
  { rejectValue: string }
>('message/sendMessage', async ({ receiverId, message, token }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_URL}/chats/messages/${receiverId}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: localStorage.getItem('_id'),
        },
      }
    );
    return response.data.sentMessage; // Ensure the response data contains the sentMessage including _id
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred while sending the message.');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobApplicationDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobApplicationDetail.fulfilled, (state, action: PayloadAction<JobApplication>) => {
        state.status = 'succeeded';
        state.jobApplication = action.payload;
        state.error = null;
      })
      .addCase(fetchJobApplicationDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.status = 'succeeded';
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.status = 'succeeded';
        state.messages.push(action.payload);
        socket.emit('newMessage', action.payload); // Emit socket event for new message
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { receiveMessage } = messageSlice.actions;

export default messageSlice.reducer;
