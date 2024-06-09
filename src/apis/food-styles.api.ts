import { FoodStyleResponse } from "~types/food-styles.type";
import http from "~utils/http";

export const GET_FOOD_STYLES_QUERY_KEY = "foodStyles";

export const getFoodStyles = () => http.get<FoodStyleResponse>("/food-styles");
