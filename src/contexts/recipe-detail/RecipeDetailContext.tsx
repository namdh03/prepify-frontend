import { createContext, FC, PropsWithChildren, useReducer } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import { reducer } from "./recipe-detail.reducer";
import { RecipeDetailContextType, RecipeDetailState } from "./recipe-detail.type";

const initialState: RecipeDetailState = {};

// Create context
const RecipeDetailContext = createContext<RecipeDetailContextType | undefined>({
  dispatch: () => null,
});

// Create provider
const RecipeDetailProvider: FC<PropsWithChildren> = ({ children }) => {
  const { recipe, foodStyles, ingredients, nutritions } = useOutletContext<RecipeDetailState>();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    recipe,
    foodStyles,
    ingredients,
    nutritions,
  });

  return (
    <RecipeDetailContext.Provider value={{ ...state, dispatch }}>{children || <Outlet />}</RecipeDetailContext.Provider>
  );
};

export { RecipeDetailContext, RecipeDetailProvider };
