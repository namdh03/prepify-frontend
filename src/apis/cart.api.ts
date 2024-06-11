import { CartResponse } from "~types/cart.type";
import http from "~utils/http";

export const GET_CART_QUERY_KEY = "GET_CART";
export const CART_STALE_TIME = 30 * 1000; // 30 seconds

export const getCart = () => http.get<CartResponse>("/cart");
