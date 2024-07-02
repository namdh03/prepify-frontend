import { RecipeFormType } from "~contexts/recipe/recipe.type";
import { ShopFormType } from "~contexts/shop/shop.type";
import { ShopRecipeResponse, TableRecipeFilter, TableRecipeResponse } from "~types/recipe.type";
import { TableRequestState } from "~types/table.type";
import columnFilterFn from "~utils/columnFilterFn";
import { LIMIT, PAGE } from "~utils/constants";
import { OrderByEnum, SortEnum } from "~utils/enums";
import { findSidebarMinMax } from "~utils/getSidebarPrice";
import http from "~utils/http";

type PreventKeyType = keyof Pick<ShopFormType["sidebar"], "price" | "evaluate">;

export const GET_SHOP_RECIPES_QUERY_KEY = "GET_SHOP_RECIPES_QUERY_KEY";

export const GET_SHOP_RECIPES_STALE_TIME = 30 * 1000; // 30 seconds

export const GET_TABLE_RECIPES_QUERY_KEY = "GET_TABLE_RECIPES_QUERY_KEY";

export const getShopRecipes = (values: ShopFormType) => {
  const params = new URLSearchParams();
  const preventKeys: PreventKeyType[] = ["price", "evaluate"];

  const { min: minPrice, max: maxPrice } = findSidebarMinMax(values.sidebar.price);
  const { min: minRating, max: maxRating } = findSidebarMinMax(values.sidebar.evaluate);

  // Handle query params for recipes
  params.set("pageSize", String(LIMIT));
  params.set("pageIndex", String(values.page || PAGE));
  values.orderBy && params.set("orderBy", values.orderBy);
  params.set("sortBy", values.sort || SortEnum.POPULAR);

  // Handle sidebar params
  const sidebarParams = Object.entries(values.sidebar)
    .filter(([key, value]) => !preventKeys.includes(key as PreventKeyType) && value?.length)
    .map(([, value]) => value && value.join(","));

  sidebarParams.length && params.set("foodStyles", sidebarParams.join(","));
  values.keyword && params.set("searchRecipe", values.keyword);

  // Set price and rating ranges if valid
  if (minPrice !== Infinity && maxPrice !== -Infinity) {
    params.set("minPrice", String(minPrice));
    params.set("maxPrice", String(maxPrice));
  }
  if (minRating !== Infinity && maxRating !== -Infinity) {
    params.set("minRating", String(minRating));
    params.set("maxRating", String(maxRating));
  }

  return http.get<ShopRecipeResponse>("/recipes", { params });
};

export const getTableRecipes = ({ sorting, columnFilters, pagination }: TableRequestState) => {
  const {
    name: searchRecipe = "",
    level: cookLevel = "",
    category = "",
  } = columnFilterFn<TableRecipeFilter>({ columnFilters });
  const { id: sortBy = "", desc: orderByDesc = false } = sorting[0] || {};
  const orderBy = orderByDesc ? OrderByEnum.DESC : OrderByEnum.ASC;

  const params = {
    ...(searchRecipe && { searchRecipe }),
    ...(cookLevel && { cookLevel }),
    ...(category && { category }),
    ...(sortBy && { sortBy, orderBy }),
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  };

  return http.get<TableRecipeResponse>("/moderator/recipes", { params });
};

export const createRecipe = (recipe: RecipeFormType) => {
  const formData = new FormData();
  formData.append("name", recipe.name);
  formData.append("ingredients", JSON.stringify(recipe.ingredients));
  formData.append("category", recipe.category.toString());
  formData.append("foodStyles", JSON.stringify(Object.values(recipe.foodStyleObj)));
  formData.append("steps", recipe.steps);
  formData.append("nutrition", JSON.stringify(recipe.nutrition));
  recipe.images.map((file) => {
    formData.append("images", file);
  });
  formData.append("time", recipe.time.toString());
  formData.append("level", recipe.level);

  return http.post("/moderator/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteRecipe = (id: string) => http.delete(`/moderator/recipes/${id}`);
