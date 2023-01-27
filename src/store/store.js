import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import dataSlice from "./dataSlice";
import windowSlice from "./windowSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userInformation: userSlice.reducer,
    data: dataSlice.reducer,
    setWindow: windowSlice.reducer,
  },
});

export default store;
