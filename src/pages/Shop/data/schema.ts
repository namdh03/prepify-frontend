import { z } from "zod";

import { OrderByEnum, SortEnum } from "~utils/constants";

export const shopSchema = z.object({
  keyword: z.string().optional(),
  sort: z.nativeEnum(SortEnum).optional(),
  orderBy: z.nativeEnum(OrderByEnum).optional(),
  sidebar: z.object({
    cuisine: z.array(z.string()),
    diet: z.array(z.string()),
    occasion: z.array(z.string()),
    price: z.array(z.string()),
    evaluate: z.array(z.string()),
  }),
  page: z.number().optional(),
});
