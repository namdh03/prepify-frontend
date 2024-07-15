import { z } from "zod";

import { SYSTEM_MESSAGES } from "~utils/constants";

const modalSchema = z.object({
  value: z.coerce
    .number({
      message: SYSTEM_MESSAGES.INVALID_NUMBER,
    })
    .int({
      message: SYSTEM_MESSAGES.INVALID_NUMBER,
    })
    .positive({
      message: SYSTEM_MESSAGES.INVALID_NUMBER,
    })
    .min(1, {
      message: SYSTEM_MESSAGES.INVALID_NUMBER,
    }),
});

export default modalSchema;
