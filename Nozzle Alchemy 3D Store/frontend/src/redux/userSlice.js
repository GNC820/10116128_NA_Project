import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  accountType: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.accountType = action.payload.accountType;
    },
    logoutRedux: (state, action) => {
      state.id = 0;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.accountType = "";
    },
  },
});

export const { loginRedux ,logoutRedux} = userSlice.actions;

export default userSlice.reducer;
