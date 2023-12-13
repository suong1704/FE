import { createSlice } from "@reduxjs/toolkit";

export const Toast = createSlice({
  name: "Toast",
  initialState: {
    settings: {
      open: false,
      status: "success",
      message: "",
    },
  },
  reducers: {
    handleToast(state, action) {
      state.settings = {
        ...state.settings,
        ...action.payload,
      };
    },
  },
});

export const { handleToast } = Toast.actions;

export default Toast.reducer;
