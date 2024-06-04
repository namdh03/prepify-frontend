import { createContext, FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { shopSchema } from "~pages/Shop/data/schema";
import { OrderByEnum, SortEnum } from "~utils/constants";

import {
  PAGE,
  ShopContextType,
  ShopFormType,
  ShopParamType,
  ShopSidebarParamType,
  SidebarOptionType,
  SidebarType,
} from "./shop.type";

const formDefaultValues: ShopFormType = {
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
    id: "below-100000",
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
    id: "above-500000",
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
  const [params, setParams] = useSearchParams();
  const form = useForm<ShopFormType>({
    resolver: zodResolver(shopSchema),
    defaultValues: formDefaultValues,
  });
  // Use useRef to store the last submitted values
  const formRefs = useRef<ShopFormType | null>(formDefaultValues);
  const [sidebarFilters] = useState<SidebarType[]>(sidebarDefaultData);

  // Load form values from URL params
  useEffect(() => {
    if (params.size === 0) return;
    const initialFormValues = JSON.parse(JSON.stringify(formDefaultValues));

    for (const [key, value] of params.entries()) {
      switch (key as ShopParamType) {
        case "keyword":
          initialFormValues.keyword = value;
          break;

        case "cuisine":
        case "diet":
        case "occasion":
        case "price":
        case "evaluate":
          initialFormValues.sidebar[key as keyof ShopFormType["sidebar"]] = value.split(",") || [];
          break;

        case "sort":
          initialFormValues.sort = value as SortEnum;
          break;

        case "orderBy":
          initialFormValues.orderBy = value as OrderByEnum;
          break;

        case "page":
          initialFormValues.page = Number(value || PAGE);
          break;
      }
    }

    formRefs.current = initialFormValues;
    form.reset(initialFormValues);
  }, [form, params]);

  // Reset form when the URL params are empty
  useEffect(() => {
    if (params.size === 0) form.reset(formDefaultValues);
  }, [form, params]);

  const onResetSidebar = () => {
    form.reset({
      ...formRefs.current,
      sidebar: formDefaultValues.sidebar,
      page: PAGE,
    });

    (["cuisine", "diet", "occasion", "price", "evaluate"] as ShopSidebarParamType[]).forEach((param) =>
      params.delete(param),
    );
    if (params.size > 0) params.set("page", PAGE.toString());

    setParams(params);
  };

  const onSubmit = useCallback(
    (values: ShopFormType) => {
      if (formRefs.current && JSON.stringify(values) === JSON.stringify(formRefs.current)) return;

      const paramConfig = [
        { key: "keyword", value: values.keyword },
        { key: "cuisine", value: values.sidebar.cuisine },
        { key: "diet", value: values.sidebar.diet },
        { key: "occasion", value: values.sidebar.occasion },
        { key: "price", value: values.sidebar.price },
        { key: "evaluate", value: values.sidebar.evaluate },
        { key: "sort", value: values.sort },
        { key: "orderBy", value: values.orderBy },
        { key: "page", value: values.page },
      ];

      paramConfig.forEach(({ key, value }) => {
        if (Array.isArray(value)) {
          value.length > 0 ? params.set(key, value.join(",")) : params.delete(key);
        } else {
          value ? params.set(key, value.toString()) : params.delete(key);
        }
      });
      setParams(params);

      // Update the last submitted values
      formRefs.current = values;
    },
    [params, setParams],
  );

  return (
    <ShopContext.Provider value={{ form, sidebarFilters, onResetSidebar, onSubmit }}>{children}</ShopContext.Provider>
  );
};

export { ShopContext, ShopProvider };
