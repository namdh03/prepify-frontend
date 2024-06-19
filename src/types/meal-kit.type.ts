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
