import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { UploadedFile } from "~pages/CreateRecipe/components/Upload/Upload";
import { UnitType } from "~types/unit.type";

import { recipeSchema } from "./recipe.schema";

export type RecipeFormType = z.infer<typeof recipeSchema>;

export type RecipeContextType = {
  form: UseFormReturn<RecipeFormType>;
  onSubmit: (values: RecipeFormType) => void;
  files: UploadedFile[];
  onUpload: (files: UploadedFile[], field: ControllerRenderProps<RecipeFormType, "images">) => void;
  units: UnitType[];
  handleCalculateTotal: () => void;
  total: number;
  isLoading: boolean;
  images: string[];
  isEditMode: boolean;
};
