import { NutritionResponse } from "~types/nutrition.type";
import http from "~utils/http";

export const GET_NUTRITION_QUERY_KEY = "GET_NUTRITION_QUERY_KEY";

export const getNutrition = () => http.get<NutritionResponse>("/nutrition");
