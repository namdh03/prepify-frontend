import { z } from "zod";

import { PHONE_REGEX, USER_MESSAGES } from "~utils/constants";

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

export const districtSchema = z.string({
  message: USER_MESSAGES.ADDRESS_MESSAGE,
});

export const specificAddressSchema = z.string({
  message: USER_MESSAGES.ADDRESS_MESSAGE,
});

export const modalSchema = z.object({
  phone: phoneSchema,
  city: citySchema,
  district: districtSchema,
  specificAddress: specificAddressSchema,
});
