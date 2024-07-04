import { SuccessResponse } from "./response.type";

export type GetPaymentResponse = SuccessResponse<{
  url: string;
}>;

export type VerifyPaymentResponse = SuccessResponse<{
  success: boolean;
  error: boolean;
}>;
