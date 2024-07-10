import { z } from "zod";

import { ACCOUNT_MESSAGES } from "~utils/constants";
import { Role } from "~utils/enums";
import { emailSchema, fullnameSchema, identityCardSchema, imageSchema, phoneSchema } from "~utils/schema";

export const accountSchema = z.object({
  identityCard: identityCardSchema,
  areaId: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: ACCOUNT_MESSAGES.AREA_IS_REQUIRED,
    }),
  address: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: ACCOUNT_MESSAGES.ADDRESS_IS_REQUIRED,
    }),
  role: z.string().default(Role.SHIPPER),
  fullname: fullnameSchema,
  email: emailSchema,
  phone: phoneSchema,
  image: imageSchema,
});
