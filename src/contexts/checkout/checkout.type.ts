import { Dispatch } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Area } from "~types/area.type";
import { CheckoutData } from "~types/checkout.type";

import checkoutSchema from "./checkout.schema";

export type CheckoutFormType = z.infer<typeof checkoutSchema>;

export enum CheckoutActionType {
  SET_AREA = "SET_AREA",
}

export interface CheckoutState {
  form: UseFormReturn<CheckoutFormType>;
  area?: Area | null;
  checkout?: CheckoutData | null;
}

export interface PayloadAction<T> {
  type: CheckoutActionType;
  payload: Partial<T>;
}

export interface CheckoutContextType extends CheckoutState {
  dispatch: Dispatch<PayloadAction<CheckoutState>>;
}

export interface ReducerHandler {
  [CheckoutActionType.SET_AREA]: (state: CheckoutState, action: PayloadAction<CheckoutState>) => CheckoutState;
}
