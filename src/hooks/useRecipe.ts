import { useContext } from "react";

import { RecipeContext } from "~contexts/recipe/RecipeContext";

// Create consumer
const useRecipe = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("Recipe context must be used within an RecipeProvider");
  }

  return context;
};

export default useRecipe;
