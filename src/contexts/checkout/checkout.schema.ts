import { z } from "zod";

import { citySchema, districtSchema, phoneSchema, specificAddressSchema } from "~pages/Checkout/data/schema";
import { DeliveryMethodEnum } from "~utils/constants";

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
