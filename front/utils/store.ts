import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../lib/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
