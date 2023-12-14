import {
  LoginCredentials,
  RegisterRequest,
  login,
  register,
} from "@/service/AuthService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const handleLoginAsync = createAsyncThunk(
  "auth/login",
  async (data: LoginCredentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await login(data);
      localStorage.setItem("token", response.data?.data.jwt);
      localStorage.setItem("userId", response.data?.data.userDTO.userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleRegisterAsync = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest, { rejectWithValue, dispatch }) => {
    try {
      const response = await register(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const auth = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isSuccesRegister: false,
    dataProfile: {},
  },
  reducers: {
    handleLogout(state) {
      state.isAuthenticated = false;
    },
    setRegisterDefault(state) {
      state.isSuccesRegister = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginAsync.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.dataProfile = payload.data.userDTO;
        // localStorage.setItem("token", payload.data.jwt);
        // localStorage.setItem("userId", payload?.userDTO.userId);
      })
      .addCase(handleRegisterAsync.fulfilled, (state, { payload }) => {
        if (payload !== undefined) {
          state.isSuccesRegister = true;
        }
      })
      .addCase(handleRegisterAsync.rejected, (state, { payload }) => {
        if (payload === undefined) {
          state.isSuccesRegister = false;
        }
      });
  },
});

export const { handleLogout, setRegisterDefault } = auth.actions;

export default auth.reducer;
