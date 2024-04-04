
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const financeSlice = createSlice({
  name: 'finance',
  initialState: {
    records: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchRecordsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRecordsSuccess: (state, action) => {
      state.records = action.payload;
      state.isLoading = false;
    },
    fetchRecordsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addRecord: (state, action) => {
      state.records.push(action.payload);
    },
  },
});

export const { fetchRecordsStart, fetchRecordsSuccess, fetchRecordsFailure, addRecord } = financeSlice.actions;

export const fetchRecords = () => async (dispatch) => {
    dispatch(fetchRecordsStart());
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/finance`);
      dispatch(fetchRecordsSuccess(response.data));
    } catch (error) {
      dispatch(fetchRecordsFailure(error.message));
    }
  };
export const addNewRecord = (newRecord) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/finance/add`, newRecord);
    dispatch(addRecord(response.data));
  } catch (error) {
    console.error('Error adding new record:', error);
  }
};

export default financeSlice.reducer;