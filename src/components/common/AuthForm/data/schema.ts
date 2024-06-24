import { z } from "zod";

import { PASSWORD_REGEX, USER_MESSAGES } from "~utils/constants";
import { emailSchema, fullnameSchema, phoneSchema } from "~utils/schema";

const passwordSchema = (message: string = "") =>
  z
    .string({
      message: message,
    })
    .refine((value) => PASSWORD_REGEX.test(value), {
      message: message,
    });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
});

export const registerSchema = z.object({
  fullname: fullnameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
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
