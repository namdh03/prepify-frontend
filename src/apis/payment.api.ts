import { GetPaymentResponse, VerifyPaymentResponse } from "~types/payment.type";
import http from "~utils/http";

export const GET_PAYMENT_QUERY_KEY = "GET_PAYMENT_QUERY_KEY";

export const GET_VERIFY_PAYMENT_QUERY_KEY = "GET_VERIFY_PAYMENT_QUERY_KEY";

export const getPayment = () => http.get<GetPaymentResponse>("/payment");

export const getVerifyPayment = (params: URLSearchParams) =>
  http.get<VerifyPaymentResponse>("/payment/verify", {
    params,
  });
