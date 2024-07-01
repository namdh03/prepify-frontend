import { TableResponseState } from "./table.type";

export type ExtraSpice = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type MealKitItem = {
  id: string;
  price: number;
  serving: number;
  extraSpice: ExtraSpice | null;
};

export type TableMealKitType = {
  id: string;
  name: string;
  serving: number;
  price: number;
  status: boolean;
  extraSpice: ExtraSpice | null;
  image: string;
};

export type TableMealKitResponse = TableResponseState<TableMealKitType>;
