import { createSlice } from "@reduxjs/toolkit";

const windowSlice = createSlice({
  name: "setWindow",
  initialState: { windowState: false },
  reducers: {
    windowStateUpdate: (state) => {
      state.windowState = true;
    },
  },
});

export default windowSlice;
export const { windowStateUpdate } = windowSlice.actions;
