import { DeliveryMethodEnum, OrderStatus } from "~utils/enums";

import { Area } from "./area.type";
import { ExtraSpice } from "./meal-kit.type";
import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";
import { User } from "./user.type";

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

export type OrderRecipeType = {
  id: string;
  name: string;
  steps: string;
  slug: string;
  createdAt: string;
  videoUrl: string | null;
  time: number;
  level: string;
  images: string[];
};

export type OrderMealKitItemType = {
  id: string;
  serving: number;
  price: number;
  status: boolean;
  rating: number;
  recipe: OrderRecipeType;
  extraSpice?: Omit<ExtraSpice, "image">;
};

export type TableOrderDetailType = {
  id: string;
  quantity: number;
  isCart: boolean;
  price: number;
  has_extra_spice: boolean;
  mealKit: OrderMealKitItemType;
};

export type CustomerOrderInfo = {
  id: string;
  user: User;
};

export type TableViewOrderDetailType = {
  id: string;
  address: string;
  datetime: string;
  totalPrice: number;
  phone: string;
  note: string;
  status: OrderStatus;
  trackingNumber: string;
  customer: CustomerOrderInfo;
  orderDetails: TableOrderDetailType[];
  area: Area;
};

export type TableOrderResponse = TableResponseState<TableOrderType>;

export type TableOrderFilter = {
  trackingNumber: string;
  area: string;
  status: OrderStatus;
};

export type ModOrderDetailResponse = SuccessResponse<TableViewOrderDetailType>;

export type OrderQueries = {
  tab?: string;
};

export type CusOrderListData = {
  id: string;
  orderItems: OrderItem[];
  status: OrderStatus;
  orderDate: string;
  totalPrice: number;
  trackingNumber: string;
};

export type CusOrderListResponse = SuccessResponse<CusOrderListData[]>;
