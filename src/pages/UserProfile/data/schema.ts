import { z } from "zod";

import { IMAGE_MESSAGES } from "~utils/constants";
import {
  citySchema,
  districtSchema,
  emailSchema,
  fullnameSchema,
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
  image: z
    .instanceof(FileList)
    .refine((file) => file && file.length == 1, IMAGE_MESSAGES.AVATAR_IS_REQUIRED)
    .refine((file) => file && file[0].size <= 1000000, IMAGE_MESSAGES.AVATAR_SIZE),
});
