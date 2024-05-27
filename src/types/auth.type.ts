import { SuccessResponse } from "./response.type";

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SHIPPER = "SHIPPER",
}

export type AuthResponse = SuccessResponse<{
  access_token: string;
}>;
