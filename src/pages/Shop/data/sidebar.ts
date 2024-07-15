import { ShopFoodStyleItem } from "~types/food-style.type";

import evaluateOptions from "./evaluateOptions";
import priceOptions from "./priceOptions";

const sidebar: ShopFoodStyleItem[] = [
  {
    type: "price",
    title: "Giá tiền",
    data: priceOptions,
  },
  {
    type: "evaluate",
    title: "Đánh giá",
    data: evaluateOptions,
  },
];

export default sidebar;
