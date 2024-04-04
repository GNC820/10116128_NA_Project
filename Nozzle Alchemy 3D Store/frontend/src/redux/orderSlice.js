import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  orderList: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setDataOrder: (state, action) => {
      state.orderList = [...action.payload];
    },
    addOrder: (state, action) => {
      state.orderList.push(action.payload);
    },
  },
});

export const {
  setDataOrder,
  addOrder

} = orderSlice.actions;

export default orderSlice.reducer;
