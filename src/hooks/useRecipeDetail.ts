import { useContext } from "react";

import { RecipeDetailContext } from "~contexts/recipe-detail/RecipeDetailContext";

// Create consumer
const useRecipeDetail = () => {
  const context = useContext(RecipeDetailContext);

  if (!context) {
    throw new Error("Recipe detail context must be used within an RecipeDetailProvider");
  }

  return context;
};

export default useRecipeDetail;
