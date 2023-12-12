/* eslint-disable @next/next/no-assign-module-variable */
import { createSlice } from "@reduxjs/toolkit";

import {
  handlePostNewModule
} from "./action";
interface Module {

  title: string,
  description: string
}
export interface PayloadNewModule {
  moduleData: Module;
}

export interface InitialState {
  dataModuleUser: [];
 
}
const initialState: InitialState = {
  dataModuleUser: []
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    clearDataDetail: (state: any) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(handlePostNewModule.fulfilled, (state, action) => {});
  },
});

export const { clearDataDetail } = moduleSlice.actions;

export default moduleSlice.reducer;
