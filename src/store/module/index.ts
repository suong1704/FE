import { createSelector, createSlice } from "@reduxjs/toolkit";

import { handleAllMyModule, handlePostNewModule } from "./action";
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
  myModules: Module[];
}
const initialState: InitialState = {
  myModules: [],
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    clearDataDetail: (state: any) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(handlePostNewModule.fulfilled, (state, action) => {});
    builder.addCase(handleAllMyModule.fulfilled, (state, action) => {
      state.myModules = action.payload;
    });
  },
});

export const { clearDataDetail } = moduleSlice.actions;

export default moduleSlice.reducer;

export type { Module }