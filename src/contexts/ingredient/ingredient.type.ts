import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { ingredientSchema } from "./ingredient.schema";

export type IngredientFormType = z.infer<typeof ingredientSchema>;

export type IngredientContextType = {
  form: UseFormReturn<IngredientFormType>;
  onSubmit: (values: IngredientFormType) => void;
  isLoading: boolean;
};
