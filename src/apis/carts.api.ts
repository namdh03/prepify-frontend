import { CartResponse } from "~types/cart.type";
import http from "~utils/http";

export const GET_CARTS_QUERY_KEY = "GET_CARTS";
export const CARTS_STALE_TIME = 30 * 1000; // 30 seconds

export const getCarts = () => http.get<CartResponse>("/carts");
