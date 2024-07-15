import { z } from "zod";

import { CATEGORY_MESSAGES } from "~utils/constants";

const modalSchema = z.object({
  name: z
    .string({
      message: CATEGORY_MESSAGES.CATEGORY_NAME_REQUIRED,
    })
    .min(1, {
      message: CATEGORY_MESSAGES.CATEGORY_NAME_REQUIRED,
    })
    .max(50, {
      message: CATEGORY_MESSAGES.CATEGORY_NAME_TOO_LONG,
    }),
});

export default modalSchema;
