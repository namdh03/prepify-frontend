import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { mealKitSchema } from "./meal-kit.schema";

export type MealKitFormType = z.infer<typeof mealKitSchema>;

export type MealKitContextType = {
  form: UseFormReturn<MealKitFormType>;
  onSubmit: (values: MealKitFormType) => void;
};
