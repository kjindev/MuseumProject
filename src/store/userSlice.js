import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userInformation",
  initialState: {
    userID: undefined,
    userEmail: undefined,
    userName: undefined,
    userPhoto: undefined,
  },
  reducers: {
    userIDUpdate: (state, action) => {
      state.userID = action.payload;
    },
    userEmailUpdate: (state, action) => {
      state.userEmail = action.payload;
    },
    userNameUpdate: (state, action) => {
      state.userName = action.payload;
    },
    userPhotoUpdate: (state, action) => {
      state.userPhoto = action.payload;
    },
  },
});

export default userSlice;
export const {
  userIDUpdate,
  userEmailUpdate,
  userNameUpdate,
  userPhotoUpdate,
} = userSlice.actions;
