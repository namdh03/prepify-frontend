import { PostOrderBody } from "~types/order.type";
import http from "~utils/http";

export const postOrder = (body: PostOrderBody) => http.post("/order", body);
