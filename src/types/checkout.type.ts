import { Area } from "./area.type";
import { OrderItem } from "./order.type";
import { SuccessResponse } from "./response.type";

export type CheckoutDate = {
  day: number;
  month: number;
  year: number;
};

export type Payment = {
  id: string;
  name: string;
  icon: string;
};

export type CheckoutData = {
  items: OrderItem[];
  area: Area[];
  instantDate: CheckoutDate;
  standardDate: CheckoutDate;
  payments: Payment[];
};

export type CheckoutResponse = SuccessResponse<CheckoutData>;
