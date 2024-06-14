import { CartResponse, DeleteCartBody, UpdateCartBody } from "~types/cart.type";
import http from "~utils/http";

export const GET_CART_QUERY_KEY = "GET_CART";
export const CART_STALE_TIME = 30 * 1000; // 30 seconds

export const getCart = () => http.get<CartResponse>("/cart");

export const updateCart = (body: UpdateCartBody) => http.put("/cart/update", body);

export const deleteOneCart = (cartId: string) => http.post("/cart/delete", { cartIds: [cartId] });

export const deleteManyCart = (body: DeleteCartBody) => http.post("/cart/delete", body);
