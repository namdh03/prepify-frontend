import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import modalSchema from "./checkout.schema";

export type ModalFormType = z.infer<typeof modalSchema>;

export type ShippingAddressType = Pick<ModalFormType, "phone" | "city" | "district" | "address">;

export type CheckoutContextType = {
  form: UseFormReturn<ModalFormType>;
  shippingAddress: ShippingAddressType;
  onShippingAddress: (data: ShippingAddressType) => void;
  isErrorSubmit: boolean;
};
