import { z } from "zod";

export const mealKitSchema = z.object({
  name: z.string().min(1),
  mealKits: z.array(
    z.object({
      mealKit: z.object({
        serving: z.number().min(1),
        price: z.number().min(1),
      }),
      extraSpice: z
        .object({
          name: z.string().min(1),
          price: z.number().min(1),
          image: z.instanceof(File),
        })
        .optional(),
    }),
  ),
});
