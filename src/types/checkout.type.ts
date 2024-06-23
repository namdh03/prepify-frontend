import { Area } from "./area.type";
import { ExtraSpice } from "./meal-kit.type";
import { SuccessResponse } from "./response.type";

export type CheckoutDate = {
  day: number;
  month: number;
  year: number;
};

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  serving: number;
  extraSpice?: ExtraSpice;
};

export type Payment = {
  id: string;
  name: string;
  icon: string;
};

export type CheckoutData = {
  items: CartItem[];
  area: Area[];
  instantDate: CheckoutDate;
  standardDate: CheckoutDate;
  payments: Payment[];
};

export type CheckoutResponse = SuccessResponse<CheckoutData>;
