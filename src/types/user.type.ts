import { Role } from "~utils/constants";

import { SuccessResponse } from "./response.type";

export interface User {
  id: string;
  email: string;
  dateOfBirth: string | null;
  phone: string | null;
  fullname: string;
  address: string | null;
  role: Role;
  avatar: string | null;
  area: string | null;
}

export type UserResponse = SuccessResponse<{
  user: User;
}>;

export type GoogleUrlResponse = SuccessResponse<{
  url: string;
}>;

export type VerifyTokenForgotPasswordResponse = SuccessResponse<{
  success: boolean;
}>;
