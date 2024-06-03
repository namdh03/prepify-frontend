import { createContext, FC, PropsWithChildren, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { shopSchema } from "~pages/Shop/data/schema";
import { SortEnum } from "~utils/constants";

import { ShopContextType, ShopFormType, SidebarOptionType, SidebarType } from "./shop.type";

// Constants
export const PAGE = 1;
export const LIMIT = 9;

const sidebarFormDefaultValues: ShopFormType = {
  keyword: "",
  sort: SortEnum.POPULAR,
  sidebar: {
    cuisine: [],
    diet: [],
    occasion: [],
    price: [],
    evaluate: [],
  },
  page: PAGE,
  limit: LIMIT,
};

const cuisineOptions: SidebarOptionType[] = [
  {
    id: "vietnam",
    label: "Việt Nam",
  },
  {
    id: "korea",
    label: "Hàn Quốc",
  },
  {
    id: "thailand",
    label: "Thái Lan",
  },
  {
    id: "japan",
    label: "Nhật Bản",
  },
  {
    id: "europe",
    label: "Tây Âu",
  },
];

const dietOptions: SidebarOptionType[] = [
  {
    id: "eat-clean",
    label: "Eat clean",
  },
  {
    id: "vegetarian",
    label: "Thuần chay",
  },
  {
    id: "keto",
    label: "Ăn kiêng",
  },
  {
    id: "balance",
    label: "Cân bằng",
  },
];

const occasionOptions: SidebarOptionType[] = [
  {
    id: "personal",
    label: "Cá nhân",
  },
  {
    id: "couple",
    label: "Cặp đôi",
  },
  {
    id: "family",
    label: "Gia đình",
  },
  {
    id: "party",
    label: "Tiệc",
  },
];

const priceOptions: SidebarOptionType[] = [
  {
    id: "0-100000",
    label: "0 - 100.000VNĐ",
  },
  {
    id: "100000-200000",
    label: "100.000 - 200.000VNĐ",
  },
  {
    id: "200000-300000",
    label: "200.000 - 300.000VNĐ",
  },
  {
    id: "300000-400000",
    label: "300.000 - 400.000VNĐ",
  },
  {
    id: ">500000",
    label: "Hơn 500.000VNĐ",
  },
];

const evaluateOptions: SidebarOptionType[] = [
  {
    id: "1",
    label: "1.0 ⭐",
  },
  {
    id: "2",
    label: "2.0 ⭐⭐",
  },
  {
    id: "3",
    label: "3.0 ⭐⭐⭐",
  },
  {
    id: "4",
    label: "4.0 ⭐⭐⭐⭐",
  },
  {
    id: "5",
    label: "5.0 ⭐⭐⭐⭐⭐",
  },
];

const sidebarDefaultData: SidebarType[] = [
  {
    key: "cuisine",
    title: "Ẩm thực",
    options: cuisineOptions,
  },
  {
    key: "diet",
    title: "Chế độ ăn",
    options: dietOptions,
  },
  {
    key: "occasion",
    title: "Dịp ăn",
    options: occasionOptions,
  },
  {
    key: "price",
    title: "Giá tiền",
    options: priceOptions,
  },
  {
    key: "evaluate",
    title: "Đánh giá",
    options: evaluateOptions,
  },
];

// Create context
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Create provider
const ShopProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<ShopFormType>({
    resolver: zodResolver(shopSchema),
    defaultValues: sidebarFormDefaultValues,
  });
  // Use useRef to store the last submitted values
  const formRefs = useRef<ShopFormType | null>(null);
  const [sidebarFilters] = useState<SidebarType[]>(sidebarDefaultData);

  const onSubmit = useCallback((values: ShopFormType) => {
    if (formRefs.current && JSON.stringify(values) === JSON.stringify(formRefs.current)) return;

    console.log(values);

    // Update the last submitted values
    formRefs.current = values;
  }, []);

  return <ShopContext.Provider value={{ form, sidebarFilters, onSubmit }}>{children}</ShopContext.Provider>;
};

export { ShopContext, ShopProvider };
