import { createContext, FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { shopSchema } from "~contexts/shop/shop.schema";
import { OrderByEnum, PAGE, SortEnum } from "~utils/constants";

import { ShopContextType, ShopFormType, ShopParamType } from "./shop.type";

const shopFormDefaultValues: ShopFormType = {
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

// Create context
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Create provider
const ShopProvider: FC<PropsWithChildren> = ({ children }) => {
  const [params, setParams] = useSearchParams();
  const form = useForm<ShopFormType>({
    resolver: zodResolver(shopSchema),
    defaultValues: shopFormDefaultValues,
  });
  // Use useRef to store the last submitted values
  const formRefs = useRef<ShopFormType | null>(shopFormDefaultValues);

  // Load form values from URL params
  useEffect(() => {
    if (params.size === 0) return;
    const initialFormValues = JSON.parse(JSON.stringify(shopFormDefaultValues));

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
    if (params.size === 0) form.reset(shopFormDefaultValues);
  }, [form, params]);

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

  return <ShopContext.Provider value={{ form, formRefs, onSubmit }}>{children}</ShopContext.Provider>;
};

export { ShopContext, ShopProvider };
