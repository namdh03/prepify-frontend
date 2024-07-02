import { ShopFoodStyleResponse } from "~types/food-style.type";
import http from "~utils/http";

export const GET_FOOD_STYLES_QUERY_KEY = "GET_FOOD_STYLES_QUERY_KEY";

export const GET_TABLE_FOOD_STYLES_STALE_TIME = 30 * 1000; // 30s

export const getFoodStyles = () => http.get<ShopFoodStyleResponse>("/food-styles");
