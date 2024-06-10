import { z } from "zod";

import { OrderByEnum, SortEnum } from "~utils/constants";

export const shopSchema = z.object({
  keyword: z.string().optional(),
  sort: z.nativeEnum(SortEnum).optional(),
  orderBy: z.nativeEnum(OrderByEnum).optional(),
  sidebar: z.record((z.string(), z.array(z.string()))),
  page: z.number().optional(),
});
