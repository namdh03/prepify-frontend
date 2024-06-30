import { ShopFoodStyleResponse } from "~types/food-styles.type";
import http from "~utils/http";

export const GET_FOOD_STYLES_QUERY_KEY = "GET_FOOD_STYLES_QUERY_KEY";

export const getFoodStyles = () => http.get<ShopFoodStyleResponse>("/food-styles");
