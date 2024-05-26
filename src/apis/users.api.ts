import { LoginFormType } from "~/pages/Login/Login";
import { RegisterFormType } from "~/pages/Register/Register";
import http from "~/utils/http";

export const register = (body: RegisterFormType) => http.post("/register", body);

export const login = (body: LoginFormType) => http.post("/login", body);
