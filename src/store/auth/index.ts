import axios from "@/api/axios";
import {
  ChangePasswordRequest,
  LoginCredentials,
  RegisterRequest,
  changePass,
  login,
  register,
} from "@/service/AuthService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../user/userSlice";

export const handleLoginAsync = createAsyncThunk(
  "auth/login",
  async (data: LoginCredentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await login(data);
      dispatch(updateUser(response.data.data.user));
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
      data.onSuccess?.();
      return response.data;
    } catch (error: any) {
      data.onError?.(error.response.data.data);
      return rejectWithValue(error.message);
    }
  }
);

export const handleChangePassAsync = createAsyncThunk(
  "auth/changePassword",
  async (data: ChangePasswordRequest, { rejectWithValue, dispatch }) => {
    console.log(data);
    try {
      const response = await changePass(data);
      data.onSuccess?.();
      return response.data;
    } catch (error: any) {
      data.onError?.(error.response.data.data);
      return rejectWithValue(error.message);
    }
  }
);

export interface User {
  userId: string;
  email: string;
  username: string;
  fullname: string,
  phone: string,
  avatarUrl: string,
  authorities: Role[]
}

export interface Role{
  roleId: number,
  authority: "Admin" | "Learner" | "Moderator"
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
