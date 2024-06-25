import { z } from "zod";

import { imageSchema } from "~utils/schema";

const feedbackSchema = z.object({
  feedback: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      rating: z.number().int().min(1).max(5),
      images: z.array(imageSchema),
    }),
  ),
});

export default feedbackSchema;
