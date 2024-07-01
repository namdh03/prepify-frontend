import { GetCategoriesResponse } from "~types/category.type";
import http from "~utils/http";

export const GET_CATEGORIES_QUERY_KEY = "GET_CATEGORIES_QUERY_KEY";

export const getCategories = () => http.get<GetCategoriesResponse>("/categories");
