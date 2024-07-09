import { LoginFormType } from "~pages/Login/Login";
import { RegisterFormType } from "~pages/Register/Register";
import { AuthResponse } from "~types/auth.type";
import { ChangePasswordBody, GoogleUrlResponse, UpdateMeBody, UserResponse } from "~types/user.type";
import http from "~utils/http";

export const GET_ME_QUERY_KEY = "GET_ME_QUERY_KEY";

export const GET_GOOGLE_URL_QUERY_KEY = "GET_GOOGLE_URL_QUERY_KEY";

export const register = (body: RegisterFormType) => http.post<AuthResponse>("/register", body);

export const login = (body: LoginFormType) => http.post<AuthResponse>("/login", body);

export const getMe = () => http.get<UserResponse>("/me");

export const getGoogleAuthUrl = () => http.get<GoogleUrlResponse>("/login/google");

export const loginWithGoogle = (code: string | null, signal?: AbortSignal) =>
  http.post<AuthResponse>("/login/google", { code }, { signal });

export const forgotPassword = (email: string) => http.post("/forgot-password", { email });

export const verifyTokenForgotPassword = (token: string | null, signal?: AbortSignal) =>
  http.post("/verify-token-forgot-password", { token }, { signal });

export const resetPassword = (token: string, password: string) => http.post("/reset-password", { token, password });

export const changePassword = (body: ChangePasswordBody) => http.put("/change-password", body);

export const updateMe = (body: UpdateMeBody) => http.put("/me", body);
