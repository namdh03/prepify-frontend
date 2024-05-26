import { RegisterFormType } from "~/pages/Register/Register";
import http from "~/utils/http";

export const register = (body: RegisterFormType) => http.post("/register", body);
