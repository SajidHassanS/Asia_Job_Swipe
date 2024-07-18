// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import companyReducer from './slices/companySlice';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice';
import userSettingsReducer from './slices/userSettingsSlice';
import jobSeekerReducer from './slices/jobSeekerSlice';
import profileReducer from './slices/profileSlices'
import experienceReducer from './slices/experienceSlice/experienceSlice';
import postJobReducer from './slices/postJobSlice';
import appliedJobReducer from './slices/appliedJobSlice/AppliedJobSlice'
import projectReducer from './slices/projects/projectSlice'
import educationReducer from './slices/educationslice/educationSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  jobSeeker: jobSeekerReducer,
  profile: profileReducer,
  job: jobReducer, // Ensure correct naming
  company: companyReducer,
  userSettings: userSettingsReducer,
  postJob: postJobReducer, // Ensure correct naming
  experience: experienceReducer,
  appliedJobs: appliedJobReducer,
  project: projectReducer,
  education: educationReducer

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
