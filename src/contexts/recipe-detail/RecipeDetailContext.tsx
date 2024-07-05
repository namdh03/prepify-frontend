import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { Outlet, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_RECIPE_DETAIL_QUERY_KEY, getCustomerRecipe } from "~apis/recipe.api";

import { reducer, setRecipe } from "./recipe-detail.reducer";
import { RecipeDetailContextType, RecipeDetailState } from "./recipe-detail.type";

const initialState: RecipeDetailState = {};

// Create context
const RecipeDetailContext = createContext<RecipeDetailContextType | undefined>({
  dispatch: () => null,
});

// Create provider
const RecipeDetailProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { slug } = useParams();
  const { data } = useQuery({
    queryKey: [GET_RECIPE_DETAIL_QUERY_KEY],
    queryFn: () => getCustomerRecipe(slug as string),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setRecipe({ recipe: data }));
    }
  }, [data]);
  return (
    <RecipeDetailContext.Provider value={{ ...state, dispatch }}>{children || <Outlet />}</RecipeDetailContext.Provider>
  );
};

export { RecipeDetailContext, RecipeDetailProvider };
