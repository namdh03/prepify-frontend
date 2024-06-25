import { z } from "zod";

import { PASSWORD_REGEX, PHONE_REGEX, USER_MESSAGES } from "./constants";

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
