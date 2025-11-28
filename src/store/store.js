import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import authReducer from "./slices/authSlice";
import storageMiddleware from "./middleware/storageMiddleware";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault().concat(storageMiddleware),
});
