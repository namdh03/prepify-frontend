import { z } from "zod";

import { OrderByEnum, PAGE, SortEnum } from "~utils/constants";
import { getZodDefaults } from "~utils/getZodDefaults";

import { ShopFormType } from "./shop.type";

export const shopSchema = z.object({
  keyword: z.string().default(""),
  sort: z.string().default(SortEnum.POPULAR),
  orderBy: z.string().default(OrderByEnum.ASC).optional(),
  sidebar: z
    .object({
      price: z.array(z.string()),
      evaluate: z.array(z.string()),
    })
    .catchall(z.array(z.string()).optional())
    .default({
      price: [],
      evaluate: [],
    }),
  page: z.number().default(PAGE),
});

export const shopDefaultValues = getZodDefaults(shopSchema) as ShopFormType;
