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
