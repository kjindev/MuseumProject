import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { logInState: false },
  reducers: {
    logIn: (state) => {
      state.logInState = true;
    },
    logOut: (state) => {
      state.logInState = false;
    },
  },
});

export default authSlice;
export const { logIn, logOut } = authSlice.actions;
