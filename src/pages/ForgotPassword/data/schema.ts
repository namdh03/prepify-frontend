import { z } from "zod";

import { emailSchema } from "~utils/schema";

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export default forgotPasswordSchema;
