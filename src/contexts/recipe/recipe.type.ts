import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { UnitType } from "~types/unit.type";

import { recipeSchema } from "./recipe.schema";
export class UploadedFile extends File {
  preview: string;

  constructor(fileBits: BlobPart[], fileName: string, preview: string, options?: FilePropertyBag) {
    super(fileBits, fileName, options);
    this.preview = preview;
  }
}

export const UploadedFileSchema = z.instanceof(UploadedFile);

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
  handleRemoveImages: (images: string) => void;
};
