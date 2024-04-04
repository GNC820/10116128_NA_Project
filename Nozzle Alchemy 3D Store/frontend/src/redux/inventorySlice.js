import { toast } from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inventory: [],
  loading: false,
  error: null,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setDataInventory: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        // Assign a new reference to state.inventory using spread operator
        state.inventory = [...action.payload];
      } else {
        // If action.payload is an empty array or not an array, reset state.inventory to an empty array
        state.inventory = [];
      }
    },
    addInventory: (state, action) => {
      state.inventory.push(action.payload);
    },
  },
});

export const { setDataInventory, addInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
