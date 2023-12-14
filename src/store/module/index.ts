import { createSlice } from "@reduxjs/toolkit";

import { handleGetAllModule, handlePostNewModule } from "./action";
import { Lesson } from "../lesson";
interface Module {
  moduleId: number,
  title: string;
  description: string;
  creatorId: string,
  createdAt: Date,
  lessons: Lesson[],
  publishTime: Date,
  deleted: boolean,
  published: boolean
}
export interface PayloadNewModule {
  moduleData: Module;
}

export interface InitialState {
  dataModuleUser: [];
}
const initialState: InitialState = {
  dataModuleUser: [],
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    clearDataDetail: (state: any) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(handlePostNewModule.fulfilled, (state, action) => {});
    builder.addCase(handleGetAllModule.fulfilled, (state, action) => {});
  },
});

export const { clearDataDetail } = moduleSlice.actions;

export default moduleSlice.reducer;

export type { Module }
