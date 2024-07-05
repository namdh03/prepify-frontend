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

export type MealKit = {
  id: string;
  price: number;
  serving: number;
  extraSpice: ExtraSpice;
};

export type TableMealKitType = {
  id: string;
  recipeName: string;
  serving: number;
  price: number;
  status: boolean;
  extraSpice: ExtraSpice | null;
  image: string;
  totalFeedback: number;
  averageRating: number;
};

export type TableMealKitResponse = TableResponseState<TableMealKitType>;

export type TableUnitFilter = {
  name: string;
  status: string;
};

export type TableUnitSorting = {
  name: string;
  status: string;
  serving: string;
  price: string;
  extraSpice_name: string;
  extraSpice_price: string;
};
