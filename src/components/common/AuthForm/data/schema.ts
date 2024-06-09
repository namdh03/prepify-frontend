import { z } from "zod";

import { PASSWORD_REGEX, PHONE_REGEX, USER_MESSAGES } from "~utils/constants";

const emailSchema = () =>
  z
    .string({
      message: USER_MESSAGES.EMAIL_MESSAGE,
    })
    .email({
      message: USER_MESSAGES.EMAIL_MESSAGE,
    });

const passwordSchema = (message: string = "") =>
  z
    .string({
      message: message,
    })
    .refine((value) => PASSWORD_REGEX.test(value), {
      message: message,
    });

export const loginSchema = z.object({
  email: emailSchema(),
  password: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
});

export const registerSchema = z.object({
  fullname: z
    .string({
      message: USER_MESSAGES.FULLNAME_MESSAGE,
    })
    .min(1, {
      message: USER_MESSAGES.FULLNAME_MESSAGE,
    }),
  email: emailSchema(),
  phone: z
    .string({
      message: USER_MESSAGES.PHONE_MESSAGE,
    })
    .refine((value) => PHONE_REGEX.test(value), {
      message: USER_MESSAGES.PHONE_MESSAGE,
    }),
  password: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema(),
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
