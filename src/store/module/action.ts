import { NewModule, createNewModule, getAllMyModules } from "@/service/modules";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { isNull } from "lodash";
import { handleToast } from "../toast";
import { RootState } from "..";
import { Module } from ".";


export const handlePostNewModule = createAsyncThunk(
  "module",
  async (payload: { newModule: NewModule, onSuccess: Function }, { rejectWithValue, dispatch }) => {
    console.log(payload.newModule);
    try {
      const response = await createNewModule(payload.newModule);
      if (response.status === 200) {
        // dispatch(getDetailDataModule(response.data.id));
        dispatch(handleToast({
          open: true,
          status: "success",
          message: "Create successfully!"
        }))
        payload.onSuccess();
      }
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleAllMyModule = createAsyncThunk<Module[], void, { state: RootState }>(
  "module/creatorId={creatorId}",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await getAllMyModules(getState().auth.dataProfile?.userId!);
      if (response.status === 200) {
        // dispatch(getDetailDataModule(response.data.id));
        dispatch(
          handleToast({
            open: true,
            status: "success",
            message: "Create successfully!",
          })
        );
      }
      console.log(response.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
