import { z } from "zod";

import { DELIVERY_METHOD, PAYMENT_METHOD, PHONE_REGEX, USER_MESSAGES } from "~utils/constants";

const modalSchema = z.object({
  phone: z
    .string({
      message: USER_MESSAGES.PHONE_MESSAGE,
    })
    .refine((value) => PHONE_REGEX.test(value), {
      message: USER_MESSAGES.PHONE_MESSAGE,
    }),
  city: z
    .string({
      message: USER_MESSAGES.ADDRESS_MESSAGE,
    })
    .refine((value) => value === "Hồ Chí Minh", {
      message: USER_MESSAGES.ADDRESS_MESSAGE,
    }),
  district: z.string({
    message: USER_MESSAGES.ADDRESS_MESSAGE,
  }),
  address: z.string({
    message: USER_MESSAGES.ADDRESS_MESSAGE,
  }),
  note: z.string().optional(),
  deliveryMethod: z.nativeEnum(DELIVERY_METHOD),
  paymentMethod: z.nativeEnum(PAYMENT_METHOD),
});

export default modalSchema;
