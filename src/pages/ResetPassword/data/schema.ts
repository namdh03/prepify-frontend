import { z } from "zod";

import { USER_MESSAGES } from "~utils/constants";
import { passwordSchema } from "~utils/schema";

const resetPasswordSchema = z
  .object({
    password: passwordSchema(),
    confirmPassword: passwordSchema(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: USER_MESSAGES.PASSWORD_CONFIRM_MESSAGE,
      path: ["confirmPassword"],
    },
  );

export default resetPasswordSchema;
