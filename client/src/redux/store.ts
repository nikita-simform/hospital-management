import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../components/Login/LoginSlice";
import PatientReducer from "../components/Patient/PatientSlice";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
    patient: PatientReducer
  },
});
