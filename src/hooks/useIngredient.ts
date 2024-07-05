import { useContext } from "react";

import { IngredientContext } from "~contexts/ingredient/IngredientContext";

// Create consumer
const useIngredient = () => {
  const context = useContext(IngredientContext);

  if (!context) {
    throw new Error("Ingredient context must be used within an IngredientProvider");
  }

  return context;
};

export default useIngredient;
