import { createContext, FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useSearchParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { shopDefaultValues, shopSchema } from "~contexts/shop/shop.schema";
import { PAGE } from "~utils/constants";

import { ShopContextType, ShopFormType } from "./shop.type";

// Create context
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Create provider
const ShopProvider: FC<PropsWithChildren> = ({ children }) => {
  const [params, setParams] = useSearchParams();
  const paramRef = useRef(params);
  const form = useForm<ShopFormType>({
    resolver: zodResolver(shopSchema),
    defaultValues: shopDefaultValues,
  });
  // Use useRef to store the last submitted values
  const formRefs = useRef<ShopFormType | null>(null);

  // Load form values from URL params
  useEffect(() => {
    if (paramRef.current.size === 0) {
      formRefs.current = shopDefaultValues;
      return;
    }

    const initialFormValues = JSON.parse(JSON.stringify(shopDefaultValues));
    for (const [key, value] of paramRef.current.entries()) {
      switch (key) {
        case "keyword":
          initialFormValues.keyword = value;
          break;

        case "sort":
          initialFormValues.sort = value;
          break;

        case "orderBy":
          initialFormValues.orderBy = value;
          break;

        case "page":
          initialFormValues.page = Number(value || PAGE);
          break;

        default:
          initialFormValues.sidebar[key] = value.split(",") || [];
      }
    }

    formRefs.current = initialFormValues;
    form.reset(initialFormValues);
  }, [form]);

  const onSubmit = useCallback(
    (values: ShopFormType) => {
      if (formRefs.current && JSON.stringify(values) === JSON.stringify(formRefs.current)) return;

      const paramsMap = {
        keyword: values.keyword,
        sort: values.sort,
        orderBy: values.orderBy,
        page: values.page ? String(values.page) : null,
        ...Object.fromEntries(
          Object.entries(values.sidebar).map(([key, value]) => [key, value && value.length ? value.join(",") : null]),
        ),
      };

      Object.entries(paramsMap).forEach(([key, value]) => {
        value ? params.set(key, value) : params.delete(key);
      });

      setParams(params, { replace: true });

      // Update the last submitted values
      formRefs.current = values;
    },
    [params, setParams],
  );

  return <ShopContext.Provider value={{ form, formRefs, onSubmit }}>{children || <Outlet />}</ShopContext.Provider>;
};

export { ShopContext, ShopProvider };
