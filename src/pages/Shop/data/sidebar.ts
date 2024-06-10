import { FoodStyleItem } from "~types/food-styles.type";

import evaluateOptions from "./evaluateOptions";
import priceOptions from "./priceOptions";

const sidebar: FoodStyleItem[] = [
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
