import { CheckoutBody } from "~types/cart.type";
import { CheckoutResponse } from "~types/checkout.type";
import http from "~utils/http";

export const GET_CHECKOUT_QUERY_KEY = "GET_CHECKOUT_QUERY_KEY";

export const postCheckout = (body: CheckoutBody) => http.post("/checkout", body);

export const getCheckout = () => http.get<CheckoutResponse>("/checkout");
