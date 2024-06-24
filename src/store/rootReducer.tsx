"use client"
import { combineReducers } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';
import authReducer from './slices/authSlice';
import jobSlice from './slices/jobSlice';
import userSettingsReducer from './slices/userSettingsSlice';
import tokens from './slices/tokens';
const rootReducer = combineReducers({

  auth: authReducer,
  job:jobSlice,
  company: companyReducer,
  userSettings: userSettingsReducer,
  // token: tokens,

});

export default rootReducer;
