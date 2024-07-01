import { IngredientResponse } from "~types/ingredients.type";
import http from "~utils/http";

export const GET_INGREDIENTS_QUERY_KEY = "GET_INGREDIENTS_QUERY_KEY";

export const getIngredients = () => http.get<IngredientResponse>("/ingredients");
