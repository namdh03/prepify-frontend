import { z } from "zod";

import {
  ACCOUNT_MESSAGES,
  IDENTITY_REGEX,
  IMAGE_MESSAGES,
  PASSWORD_REGEX,
  PHONE_REGEX,
  USER_MESSAGES,
} from "./constants";

// GLOBAL SCHEMA
export const emailSchema = z
  .string({
    message: USER_MESSAGES.EMAIL_MESSAGE,
  })
  .email({
    message: USER_MESSAGES.EMAIL_MESSAGE,
  });

export const passwordSchema = (message: string = "") =>
  z
    .string({
      message: message,
    })
    .refine((value) => PASSWORD_REGEX.test(value), {
      message: message,
    });

export const fullnameSchema = z
  .string({
    message: USER_MESSAGES.FULLNAME_MESSAGE,
  })
  .min(1, {
    message: USER_MESSAGES.FULLNAME_MESSAGE,
  });

export const phoneSchema = z
  .string({
    message: USER_MESSAGES.PHONE_MESSAGE,
  })
  .refine((value) => PHONE_REGEX.test(value), {
    message: USER_MESSAGES.PHONE_MESSAGE,
  });

export const citySchema = z
  .string({
    message: USER_MESSAGES.ADDRESS_MESSAGE,
  })
  .refine((value) => value === "Hồ Chí Minh", {
    message: USER_MESSAGES.ADDRESS_MESSAGE,
  });

export const districtSchema = z
  .string({
    message: USER_MESSAGES.ADDRESS_MESSAGE,
  })
  .min(1, {
    message: USER_MESSAGES.DISTRICT_MESSAGE,
  });

export const specificAddressSchema = z
  .string({
    message: USER_MESSAGES.ADDRESS_MESSAGE,
  })
  .min(1, {
    message: USER_MESSAGES.SPECIFIC_ADDRESS_MESSAGE,
  });

export const imageSchema = z.instanceof(File).refine(
  (file) => {
    // Check if file size is less than or equal to 1MB (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      return false;
    }
    // Check if file type is either 'image/jpeg' or 'image/png'
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return false;
    }
    return true;
  },
  {
    message: IMAGE_MESSAGES.IMAGE_MUST_BE_JPEG_OR_PNG_AND_NOT_EXCEED_1MB,
  },
);

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const identityCardSchema = z
  .string()
  .min(1, {
    message: ACCOUNT_MESSAGES.IDENTITY_CARD_REQUIRED,
  })
  .refine((value) => IDENTITY_REGEX.test(value), {
    message: ACCOUNT_MESSAGES.IDENTITY_CARD_INVALID,
  });
