import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    dataNowState: [],
    dataPrevState: [],
    bannerImageState: [],
    navNameState: "intro",
    slideIndexState: 0,
    bookMark: false,
  },
  reducers: {
    dataNowUpdate: (state, action) => {
      state.dataNowState = action.payload;
    },
    dataPrevUpdate: (state, action) => {
      state.dataPrevState = action.payload;
    },
    bannerImageUpdate: (state, action) => {
      state.bannerImageState = action.payload;
    },
    navNameUpdate: (state, action) => {
      state.navNameState = action.payload;
    },
    slideIndexUpdate: (state, action) => {
      state.slideIndexState = action.payload;
    },
    bookMarkUpdate: (state) => {
      state.bookMarkState = !state.bookMarkState;
    },
  },
});

export default dataSlice;
export const {
  dataNowUpdate,
  dataPrevUpdate,
  bannerImageUpdate,
  navNameUpdate,
  slideIndexUpdate,
  bookMarkUpdate,
} = dataSlice.actions;
