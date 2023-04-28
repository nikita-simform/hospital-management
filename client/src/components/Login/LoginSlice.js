import { createSlice } from "@reduxjs/toolkit";

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
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = LoginSlice.actions;

export default LoginSlice.reducer;
