import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  unit: z.string().min(1),
  category: z.string().min(1),
  imageURL: z.string().url().min(1),
});
