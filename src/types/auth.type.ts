import { SuccessResponse } from "./response.type";

export type AuthResponse = SuccessResponse<{
  access_token: string;
}>;
