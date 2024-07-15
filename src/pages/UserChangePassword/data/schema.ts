import { z } from "zod";

import { USER_MESSAGES } from "~utils/constants";
import { passwordSchema } from "~utils/schema";

const userChangePasswordSchema = z
  .object({
    oldPassword: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
    newPassword: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
    newConfirmPassword: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
  })
  .refine(
    (values) => {
      return values.newPassword === values.newConfirmPassword;
    },
    {
      message: USER_MESSAGES.PASSWORD_CONFIRM_MESSAGE,
      path: ["newConfirmPassword"],
    },
  );

export default userChangePasswordSchema;
