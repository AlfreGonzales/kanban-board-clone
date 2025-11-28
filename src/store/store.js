import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});
