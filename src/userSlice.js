import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userInformation",
  initialState: {
    userEmail: null,
    userName: null,
    userPhoto: null,
  },
  reducers: {
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
export const { userEmailUpdate, userNameUpdate, userPhotoUpdate } =
  userSlice.actions;
