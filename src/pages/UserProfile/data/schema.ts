import { z } from "zod";

import {
  citySchema,
  districtSchema,
  emailSchema,
  fullnameSchema,
  imageSchema,
  phoneSchema,
  specificAddressSchema,
} from "~utils/schema";

export const userProfileSchema = z.object({
  fullname: fullnameSchema,
  email: emailSchema,
  phone: phoneSchema,
  city: citySchema,
  district: districtSchema,
  specificAddress: specificAddressSchema,
  restrictIngredients: z
    .array(
      z.object({
        id: z.string().optional(),
      }),
    )
    .optional(),
});

export const uploadAvatarSchema = z.object({
  image: imageSchema,
});
