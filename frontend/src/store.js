import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import jobsReducer from './features/jobs/jobsSlice';
import authReducer from './features/auth/authSlice';
import logger from "redux-logger";

export default configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer
  },
  middleware: [...getDefaultMiddleware(), logger],
});
