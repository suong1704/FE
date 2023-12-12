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

const LOGIN = `http://localhost:8000/api/v1/auth/login`;
const REGISTER = `http://localhost:8000/api/v1/auth/register`;

const login = (credentials: LoginCredentials) =>
  axios.post(`${LOGIN}`, credentials);
const register = (credentials: RegisterRequest) =>
  axios.post(`${REGISTER}`, credentials);

export { login, register };
