import { z } from "zod";

import { FOOD_STYLE_MESSAGES } from "~utils/constants";
import { optionSchema } from "~utils/schema";

const modalSchema = z.object({
  title: z
    .array(optionSchema, {
      message: FOOD_STYLE_MESSAGES.FOOD_STYLE_TITLE_REQUIRED,
    })
    .min(1, {
      message: FOOD_STYLE_MESSAGES.FOOD_STYLE_TITLE_REQUIRED,
    }),
  name: z
    .string({
      message: FOOD_STYLE_MESSAGES.FOOD_STYLE_NAME_REQUIRED,
    })
    .min(1, {
      message: FOOD_STYLE_MESSAGES.FOOD_STYLE_NAME_REQUIRED,
    })
    .max(50, {
      message: FOOD_STYLE_MESSAGES.FOOD_STYLE_NAME_TOO_LONG,
    }),
});

export default modalSchema;
