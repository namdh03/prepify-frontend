import { DeliveryMethodEnum } from "~utils/enums";

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

export type TableOrderType = {
  id: string;
  trackingNumber: string;
  deliveredBy: string;
  status: string;
  area: string;
  totalOrderDetails: number;
  datetime: string;
  totalPrice: number;
  phone: string;
  address: string;
};

// export type TableViewOrderDetailType = {};
