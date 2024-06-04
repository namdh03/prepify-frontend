import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { shopSchema } from "~pages/Shop/data/schema";

// Constants
export const PAGE = 1;
export const LIMIT = 9;

export type ShopFormType = z.infer<typeof shopSchema>;

export type SidebarOptionType = {
  id: string;
  label: string;
};

export type SidebarType = {
  key: keyof ShopFormType["sidebar"];
  title: string;
  options: SidebarOptionType[];
};

export type ShopContextType = {
  form: UseFormReturn<ShopFormType>;
  sidebarFilters: SidebarType[];
  onResetSidebar: () => void;
  onSubmit: (values: ShopFormType) => void;
};

export type ShopSidebarParamType = keyof ShopFormType["sidebar"];

export type ShopParamType = keyof Omit<ShopFormType, "sidebar"> | ShopSidebarParamType;
