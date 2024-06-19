import { CheckoutBody } from "~types/cart.type";
import http from "~utils/http";

export const checkout = (body: CheckoutBody) => http.post("/checkout", body);
