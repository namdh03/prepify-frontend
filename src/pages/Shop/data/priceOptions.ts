import { FoodStyleData } from "~types/food-styles.type";

const priceOptions: FoodStyleData[] = [
  {
    id: "below-100000",
    name: "0 - 100.000VNĐ",
    slug: "below-100000",
  },
  {
    id: "100000-200000",
    name: "100.000 - 200.000VNĐ",
    slug: "100000-200000",
  },
  {
    id: "200000-300000",
    name: "200.000 - 300.000VNĐ",
    slug: "200000-300000",
  },
  {
    id: "300000-400000",
    name: "300.000 - 400.000VNĐ",
    slug: "300000-400000",
  },
  {
    id: "above-500000",
    name: "Hơn 500.000VNĐ",
    slug: "above-500000",
  },
];

export default priceOptions;
