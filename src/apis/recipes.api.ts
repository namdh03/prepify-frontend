import { ShopFormType } from "~contexts/shop/shop.type";
import { ShopRecipeResponse } from "~types/recipes.type";
import { LIMIT, PAGE, SortEnum } from "~utils/constants";
import http from "~utils/http";

export const GET_RECIPES_QUERY_KEY = "recipes";

export const getRecipes = (values: ShopFormType) => {
  const params = new URLSearchParams();
  // Prevent keys that are not needed for query params
  const preventKeys = ["price", "evaluate"];

  // Handle query params for recipes
  params.set("pageSize", String(LIMIT));
  params.set("pageIndex", String(values.page || PAGE));
  values.orderBy && params.set("orderBy", values.orderBy);
  params.set("sortBy", values.sort || SortEnum.POPULAR);
  Object.entries(values.sidebar).forEach(([key, value]) => {
    if (preventKeys.includes(key) || !value.length) return;
    params.append("foodStyles", value.join(","));
  });
  values.keyword && params.set("searchRecipe", values.keyword);

  return http.get<ShopRecipeResponse>("/recipes", { params });
};
