import Food from "~/types/food.type";
import http from "~/utils/http";

export const getFoods = () => http.get<Food[]>("/posts");
