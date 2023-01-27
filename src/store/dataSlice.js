import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    dataNowState: undefined,
    dataPrevState: undefined,
    navNameState: "intro",
    slideIndexState: 0,
  },
  reducers: {
    dataNowUpdate: (state, action) => {
      state.dataNowState = action.payload;
    },
    dataPrevUpdate: (state, action) => {
      state.dataPrevState = action.payload;
    },
    navNameUpdate: (state, action) => {
      state.navNameState = action.payload;
    },
    slideIndexUpdate: (state, action) => {
      state.slideIndexState = action.payload;
    },
  },
});

export default dataSlice;
export const {
  dataNowUpdate,
  dataPrevUpdate,
  navNameUpdate,
  slideIndexUpdate,
} = dataSlice.actions;
