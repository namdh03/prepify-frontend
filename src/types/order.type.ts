import { DeliveryMethodEnum, OrderStatus } from "~utils/enums";

import { ExtraSpice } from "./meal-kit.type";
import { TableResponseState } from "./table.type";

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
  area: string;
  status: OrderStatus;
  datetime: string;
  customer: string;
  phone: string;
  address: string;
  note: string;
  totalOrderDetails: number;
  totalPrice: number;
};

// export type TableViewOrderDetailType = {};

export type TableOrderResponse = TableResponseState<TableOrderType>;

export type TableOrderFilter = {
  trackingNumber: string;
  area: string;
  status: OrderStatus;
};
