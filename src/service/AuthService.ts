import axios from "@/api/axios";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  onSuccess?: () => void,
  onError?: (mes: string) => void
}

export interface ChangePasswordRequest {
  username: string;
  oldPassword: string;
  newPassword: string;
  onSuccess?: () => void,
  onError?: (mes: string) => void
}

const LOGIN = `/auth/login`;
const REGISTER = `/auth/register`;
const CHANGEPASS = "/auth/changePassword";

const login = (credentials: LoginCredentials) =>
  axios.post(`${LOGIN}`, credentials);
const register = (credentials: RegisterRequest) =>
  axios.post(`${REGISTER}`, credentials);
const changePass = (credentials: ChangePasswordRequest) =>
  axios.patch(`${CHANGEPASS}`, credentials);

export { login, register, changePass };
