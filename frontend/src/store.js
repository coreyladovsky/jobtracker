import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import jobsReducer from './features/jobs/jobsSlice';
import authReducer from './features/auth/authSlice';
import filterReducer from './features/filter/filterSlice';
import logger from "redux-logger";

export default configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
    filter: filterReducer
  },
  middleware: [...getDefaultMiddleware(), logger],
});
