import { z } from "zod";

import { getZodDefaults } from "~utils/getZodDefaults";

import { FeedbackFormType } from "../components/Feedback/Feedback";

export const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5).default(5),
  page: z.number().int().min(1).default(1),
});

export const feedbackDefaultValues = getZodDefaults(feedbackSchema) as FeedbackFormType;
