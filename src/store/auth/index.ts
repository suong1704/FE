import axios from "@/api/axios";
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
      console.log(response.data.data);
      return response.data.data;
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

interface User {
  userId: string;
  email: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isSuccesRegister: boolean;
  dataProfile?: User;
}

const init: AuthState = {
  isAuthenticated: false,
  isSuccesRegister: false,
};

export const auth = createSlice({
  name: "auth",
  initialState: init,
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
        state.dataProfile = payload.user;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${payload.jwt}`;
        localStorage.setItem("token", payload.jwt);
        localStorage.setItem("userId", payload?.user.userId);
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
