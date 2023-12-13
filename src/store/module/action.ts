import { NewModule, createNewModule, getAllModules } from "@/service/modules";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { isNull } from "lodash";
import { handleToast } from "../toast";


export const handlePostNewModule = createAsyncThunk(
  "module/newModule",
  async (payload: NewModule, { rejectWithValue, dispatch }) => {
    try {
      const response = await createNewModule(payload);
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
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleGetAllModule = createAsyncThunk(
  "module/allModule",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getAllModules();
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
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
