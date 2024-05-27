import { LoginFormType } from "~/pages/Login/Login";
import { RegisterFormType } from "~/pages/Register/Register";
import { AuthResponse } from "~/types/auth.type";
import { UserResponse } from "~/types/user.type";
import http from "~/utils/http";

export const getMeQueryKey = "me";

export const register = (body: RegisterFormType) => http.post<AuthResponse>("/register", body);

export const login = (body: LoginFormType) => http.post<AuthResponse>("/login", body);

export const getMe = () => http.get<UserResponse>("/me");
