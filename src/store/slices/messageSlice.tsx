

"use client";

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

export interface Message {
  _id: string;
  sender: string; 
  receiver: string;  
  message: string;
  createdAt: string;
}

interface JobSeeker {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  userInfo: string;   
}


interface JobApplication {
  _id: string;
  jobSeeker: JobSeeker;
}

export interface User {
  _id: string;
  role: string;
  companyName?: string;
  companyLogo?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}

 export interface Chat {
  _id: string;
  participants: JobSeeker[];
  messages: Message[];
  users: User[];
  latestMessage: Message;
  createdAt: string;
  updatedAt: string;
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
    return response.data.messages;
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
    return response.data.sentMessage; // Ensure backend response contains 'sentMessage'
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred while sending the message.');
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

export const fetchChats = createAsyncThunk<
  Chat[],
  { token: string },
  { rejectValue: string }
>('message/fetchChats', async ({ token }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || 'An error occurred while fetching the chats.');
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
      const newMessage = action.payload;

      // Find or create chat
      const chatIndex = state.chats.findIndex(chat =>
        chat.messages.some(msg => msg.sender === newMessage.sender || msg.receiver === newMessage.receiver)
      );

      if (chatIndex !== -1) {
        // Update existing chat
        state.chats[chatIndex].messages.push(newMessage);
        state.chats[chatIndex].latestMessage = newMessage;
      } else {
        // Create new chat
        state.chats.push({
          _id: newMessage.receiver || newMessage.sender,
          participants: [], // Optionally populate with participants
          messages: [newMessage],
          users: [], // Optionally populate with users
          latestMessage: newMessage,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      state.messages.push(newMessage); // Also add to global messages
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
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
        state.status = 'succeeded';
        state.chats = action.payload;
        state.error = null;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { receiveMessage } = messageSlice.actions;

export default messageSlice.reducer;
