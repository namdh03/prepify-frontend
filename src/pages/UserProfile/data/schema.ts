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
  email: emailSchema.optional(),
  phone: phoneSchema,
  city: citySchema,
  areaId: districtSchema,
  address: specificAddressSchema,
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
