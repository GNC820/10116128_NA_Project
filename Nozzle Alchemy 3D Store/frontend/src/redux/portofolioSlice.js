import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  portofolioList: [],
};

export const portofolioSlice = createSlice({
  name: "portofolio",
  initialState,
  reducers: {
    setDataPortofolio: (state, action) => {
      state.portofolioList = [...action.payload];
    },
    addPortofolio: (state, action) => {
        state.portofolioList = [...state.portofolioList, action.payload];
    },
  },
});

export const {
    setDataPortofolio,
    addPortofolio

} = portofolioSlice.actions;

export default portofolioSlice.reducer;
