import { AddToCartBody, CartResponse, DeleteCartBody, UpdateCartBody } from "~types/cart.type";
import http from "~utils/http";

export const GET_CART_QUERY_KEY = "GET_CART_QUERY_KEY";

export const getCart = () => http.get<CartResponse>("/cart");

export const updateCart = (body: UpdateCartBody) => http.put("/cart/update", body);

export const deleteOneCart = (cartId: string) => http.post("/cart/delete", { cartIds: [cartId] });

export const deleteManyCart = (body: DeleteCartBody) => http.post("/cart/delete", body);

export const addToCart = (body: AddToCartBody) => http.post("/cart/add", body);
