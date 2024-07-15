import { z } from "zod";

import { UNIT_MESSAGES } from "~utils/constants";
import { UnitEnum, UnitText } from "~utils/enums";

const modalSchema = z.object({
  name: z
    .string({
      message: UNIT_MESSAGES.UNIT_NAME_REQUIRED,
    })
    .min(1, {
      message: UNIT_MESSAGES.UNIT_NAME_REQUIRED,
    })
    .max(50, {
      message: UNIT_MESSAGES.UNIT_NAME_TOO_LONG,
    }),
  type: z
    .array(
      z.object({
        label: z.nativeEnum(UnitText),
        value: z.nativeEnum(UnitEnum),
        disable: z.boolean().optional(),
      }),
      {
        message: UNIT_MESSAGES.UNIT_TYPE_REQUIRED,
      },
    )
    .min(1, {
      message: UNIT_MESSAGES.UNIT_TYPE_REQUIRED,
    }),
});

export default modalSchema;
