import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userInformation",
  initialState: { userEmail: null, userID: null, userName: null },
  reducers: {
    afterLogIn: (state, action) => {
      state.userID = action.payload.userID;
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
    },
    userNameEdit: (state, action) => {
      console.log(action);
      state.userName = action.payload.userName;
    },
  },
});

export default userSlice;
export const { afterLogIn, userNameEdit } = userSlice.actions;
