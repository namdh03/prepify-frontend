import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { GET_CHECKOUT_QUERY_KEY, getCheckout } from "~apis/checkout.api";
import useAuth from "~hooks/useAuth";
import { DeliveryMethodEnum } from "~utils/constants";

import { reducer, setArea } from "./checkout.reducer";
import checkoutSchema from "./checkout.schema";
import { CheckoutContextType, CheckoutFormType } from "./checkout.type";

// Create context
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Create provider
const CheckoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const form = useForm<CheckoutFormType>({
    mode: "all",
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "",
      phone: user?.phone || "",
      deliveryMethod: DeliveryMethodEnum.STANDARD,
      paymentMethod: "",
      district: "",
      note: "",
      specificAddress: "",
    },
  });
  const { data } = useQuery({
    queryKey: [GET_CHECKOUT_QUERY_KEY],
    queryFn: () => getCheckout(),
    select: (data) => data.data.data,
  });
  const [state, dispatch] = useReducer(reducer, {
    form,
    area: null,
    checkout: null,
  });

  // Set default value for payment method
  useEffect(() => {
    if (!form.getValues("paymentMethod")) form.setValue("paymentMethod", data?.payments[0].id || "");
  }, [data?.payments, form]);

  // Set default value for area
  useEffect(() => {
    const area = data?.area.find((area) => area.id === user?.areaId);
    if (area) {
      dispatch(setArea({ area }));
    }
  }, [data?.area, user?.areaId]);

  return <CheckoutContext.Provider value={{ ...state, checkout: data, dispatch }}>{children}</CheckoutContext.Provider>;
};

export { CheckoutContext, CheckoutProvider };
