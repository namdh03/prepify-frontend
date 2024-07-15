import { z } from "zod";

import { USER_MESSAGES } from "~utils/constants";
import { emailSchema, fullnameSchema, passwordSchema, phoneSchema } from "~utils/schema";

const registerSchema = z.object({
  fullname: fullnameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
});

export default registerSchema;
