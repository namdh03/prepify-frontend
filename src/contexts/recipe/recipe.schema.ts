import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string(),
  ingredients: z.array(
    z.object({
      ingredient_id: z.string(),
      amount: z.number(),
      unit_id: z.string(),
    }),
  ),
  steps: z.string(),
  time: z.number(),
  level: z.string(), //emun ["easy", "medium", "hard"]
  nutrition: z.array(
    z.object({
      nutrition_id: z.string(),
      amount: z.number(),
      unit_id: z.string(),
    }),
  ),
  category: z.string(),
  images: z.array(z.instanceof(File)),
  videoUrl: z.string().url(),
  foodStyleObj: z.record(z.string(), z.string()),
});
