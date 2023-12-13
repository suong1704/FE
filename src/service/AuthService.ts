import axios from "@/api/axios";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

const LOGIN = `/auth/login`;
const REGISTER = `/auth/register`;

const login = (credentials: LoginCredentials) =>
  axios.post(`${LOGIN}`, credentials);
const register = (credentials: RegisterRequest) =>
  axios.post(`${REGISTER}`, credentials);

export { login, register };
