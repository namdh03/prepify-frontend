import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "~hooks/useAuth";
import { DeliveryMethodEnum, PaymentMethodEnum } from "~utils/constants";

import modalSchema from "./checkout.schema";
import { CheckoutContextType, ModalFormType, ShippingAddressType } from "./checkout.type";

// Create context
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Create provider
const CheckoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const form = useForm<ModalFormType>({
    mode: "all",
    resolver: zodResolver(modalSchema),
    defaultValues: {
      phone: "",
      city: "Hồ Chí Minh",
      deliveryMethod: DeliveryMethodEnum.FAST,
      paymentMethod: PaymentMethodEnum.VNPAY,
    },
  });
  const [shippingAddress, setShippingAddress] = useState<ShippingAddressType>({
    phone: "",
    city: "",
    district: "",
    address: "",
  });
  const isErrorSubmit = useMemo(() => !(user?.phone || user?.address), [user?.address, user?.phone]);

  const onShippingAddress = (data: ShippingAddressType) => setShippingAddress(data);

  return (
    <CheckoutContext.Provider value={{ form, shippingAddress, onShippingAddress, isErrorSubmit }}>
      {children},
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutProvider };
