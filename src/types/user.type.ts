import { SuccessResponse } from "./response.type";

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SHIPPER = "SHIPPER",
}

export interface User {
  id: string;
  email: string;
  dateOfBirth: string | null;
  phone: string;
  fullname: string;
  address: string | null;
  role: Role;
  avatar: string | null;
  area: string | null;
}

export type UserResponse = SuccessResponse<{
  user: User;
}>;
