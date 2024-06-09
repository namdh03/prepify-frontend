import { useContext } from "react";

import { CheckoutContext } from "~contexts/checkout/CheckoutContext";

// Create consumer
const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("Checkout context must be used within an ShopProvider");
  }

  return context;
};

export default useCheckout;
