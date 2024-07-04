// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice'; // Ensure correct naming
import userSettingsReducer from './slices/userSettingsSlice';
// import jobSeekersReducer from './slices/jobSeekersSlice';
import jobSeekerReducer from './slices/jobSeekerSlice';
import profileReducer from './slices/ProfileSlice';
// import tokens from './slices/tokens';

const rootReducer = combineReducers({
  auth: authReducer,
  // jobSeekers: jobSeekersReducer,
  jobSeeker: jobSeekerReducer,
  profile: profileReducer,
  job: jobReducer, // Ensure correct naming
  company: companyReducer,
  userSettings: userSettingsReducer,
  // token: tokens,
});

export default rootReducer;
