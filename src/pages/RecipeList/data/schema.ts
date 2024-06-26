import { z } from "zod";

import { LevelEnum } from "~utils/constants";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  level: z.nativeEnum(LevelEnum),
  time: z.number(),
  category: z.string(),
  cuisine: z.string(),
  diet: z.string(),
  occasion: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;
