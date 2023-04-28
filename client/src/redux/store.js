import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../components/Login/LoginSlice";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
  },
});
