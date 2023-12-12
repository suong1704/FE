import { createAsyncThunk } from "@reduxjs/toolkit";

import { isNull } from "lodash";


export const handlePostNewModule = createAsyncThunk(
  "module/handlePostNewModule",
  async (idModule: number, { rejectWithValue }) => {
   
  }
);
