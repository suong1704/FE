import { ThunkAction, createSelector, createSlice } from "@reduxjs/toolkit";

import { handleAllMyModule, handlePostNewModule } from "./action";
import { Lesson } from "../lesson";
import { RootState } from "..";
import axios from "@/api/axios";
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
    replaceMyModule: (state, action: { payload: Module }) => {
      const newMyModules = state.myModules.map((m) => {
        if(m.moduleId == action.payload.moduleId) return action.payload;
        return m;
      });
      state.myModules = newMyModules;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(handlePostNewModule.fulfilled, (state, action) => {});
    builder.addCase(handleAllMyModule.fulfilled, (state, action) => {
      state.myModules = action.payload;
    });
  },
});

export const { clearDataDetail, replaceMyModule } = moduleSlice.actions;

const updateModuleThunk = (module: Module, onSucess: Function) => {
  const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
    const res = await axios.patch(`/modules`, module);
    dispatch(replaceMyModule(module));
    onSucess();
  };

  return thunk;
}

export default moduleSlice.reducer;

export type { Module }

export { updateModuleThunk }