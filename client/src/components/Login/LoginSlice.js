import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../utils/storage";

const initialState = {
  user: {},
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      setLocalStorage("token", action.payload);
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken } = LoginSlice.actions;

export default LoginSlice.reducer;
