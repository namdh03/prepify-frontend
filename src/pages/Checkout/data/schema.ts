import { z } from "zod";

import { citySchema, districtSchema, phoneSchema, specificAddressSchema } from "~utils/schema";

export const modalSchema = z.object({
  phone: phoneSchema,
  city: citySchema,
  district: districtSchema,
  specificAddress: specificAddressSchema,
});
