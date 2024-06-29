import { z } from "zod";

import { FEEDBACK_MESSAGES } from "~utils/constants";
import { imageSchema } from "~utils/schema";

const feedbackSchema = z.object({
  feedback: z.array(
    z.object({
      id: z.string(),
      content: z.string().max(500, {
        message: FEEDBACK_MESSAGES.FEEDBACK_CONTENT_TOO_LONG,
      }),
      rating: z.number().int().min(1).max(5),
      images: z.array(imageSchema),
    }),
  ),
});

export default feedbackSchema;
