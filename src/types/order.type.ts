import { DeliveryMethodEnum } from "~utils/constants";

import { ExtraSpice } from "./meal-kit.type";

export type OrderItem = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  serving: number;
  extraSpice?: ExtraSpice;
};

export type PostOrderBody = {
  paymentId: string;
  areaId: string;
  address: string;
  note: string;
  deliveryMethod: DeliveryMethodEnum;
  phone: string;
};
