import { z } from "zod";

import { UNIT_MESSAGES } from "~utils/constants";

const modalSchema = z.object({
  name: z
    .string({
      message: UNIT_MESSAGES.UNIT_NAME_REQUIRED,
    })
    .min(1, {
      message: UNIT_MESSAGES.UNIT_NAME_REQUIRED,
    })
    .max(50, {
      message: UNIT_MESSAGES.UNIT_NAME_TOO_LONG,
    }),
});

export default modalSchema;
