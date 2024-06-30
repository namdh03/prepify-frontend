import { z } from "zod";

import { DeliveryMethodEnum } from "~utils/enums";
import { citySchema, districtSchema, phoneSchema, specificAddressSchema } from "~utils/schema";

const checkoutSchema = z.object({
  phone: phoneSchema,
  city: citySchema,
  district: districtSchema,
  specificAddress: specificAddressSchema,
  note: z.string().optional(),
  deliveryMethod: z.nativeEnum(DeliveryMethodEnum),
  paymentMethod: z.string(),
});

export default checkoutSchema;
