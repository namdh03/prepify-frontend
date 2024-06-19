import { z } from "zod";

import { getZodDefaults } from "~utils/getZodDefaults";

import { RecipeDetailFormType } from "./recipe-detail.type";

export const recipeDetailSchema = z.object({
  has_extra_spice: z.boolean().default(false),
  mealkitId: z.string().default(""),
  quantity: z.number().default(1),
});

export const recipeDetailDefaultValues = getZodDefaults(recipeDetailSchema) as RecipeDetailFormType;
