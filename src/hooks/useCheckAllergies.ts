import { useMemo } from "react";

import { IngredientType } from "~types/ingredient.type";

import useAuth from "./useAuth";

const useCheckAllergies = (ingredients: IngredientType[]): IngredientType[] => {
  const { user } = useAuth();

  return useMemo(
    () =>
      ingredients?.filter((ingredient) =>
        user?.customer.restrictIngredients.some(
          (restrictIngredient) => restrictIngredient.ingredient.id === ingredient.id,
        ),
      ),
    [ingredients, user?.customer.restrictIngredients],
  );
};

export default useCheckAllergies;
