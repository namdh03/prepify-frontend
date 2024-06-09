import { ShopFormType } from "~contexts/shop/shop.type";

import { SuccessResponse } from "./response.type";

export type SidebarOptionType = {
  id: string;
  name: string;
  slug: string;
};

export type SidebarType = {
  type: keyof ShopFormType["sidebar"];
  title: string;
  data: SidebarOptionType[];
};

export type FoodStyleResponse = SuccessResponse<SidebarType[]>;
