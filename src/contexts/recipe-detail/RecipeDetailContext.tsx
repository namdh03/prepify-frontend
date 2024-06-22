import { createContext, FC, PropsWithChildren, useReducer } from "react";

import images from "~assets/imgs";

import { reducer } from "./recipe-detail.reducer";
import { RecipeDetailContextType, RecipeDetailState } from "./recipe-detail.type";

// Dummy data
const recipe = {
  id: "string",
  slug: "string",
  name: "Trứng chiên",
  star: 5,
  sold: 1300,
  totalFeedback: 400,
  images: [images.suggest1st, images.suggest2nd, images.mission1st, images.mission2nd, images.mission3rd],
  mealKits: [
    {
      id: "feqfqe2",
      price: 10000,
      serving: 1,
      extraSpice: {
        id: "string",
        name: "Gói gia vị hoàn chỉnh 1",
        image: images.suggest1st,
        price: 9999,
      },
    },
    {
      id: "vg",
      price: 20000,
      serving: 2,
      extraSpice: {
        id: "string",
        name: "Gói gia vị hoàn chỉnh 2",
        image: images.suggest2nd,
        price: 9999,
      },
    },
    {
      id: "string-extra-spice-3rd",
      price: 30000,
      serving: 3,
      extraSpice: {
        id: "string",
        name: "Gói gia vị hoàn chỉnh 3",
        image: images.mission1st,
        price: 9999,
      },
    },
  ],
};

const initialState: RecipeDetailState = {
  recipe,
};

// Create context
const RecipeDetailContext = createContext<RecipeDetailContextType | undefined>({
  ...initialState,
  dispatch: () => null,
});

// Create provider
const RecipeDetailProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <RecipeDetailContext.Provider value={{ ...state, dispatch }}>{children}</RecipeDetailContext.Provider>;
};

export { RecipeDetailContext, RecipeDetailProvider };
