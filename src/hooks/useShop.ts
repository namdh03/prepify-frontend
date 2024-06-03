import { useContext } from "react";

import { ShopContext } from "~contexts/shop/ShopContext";

// Create consumer
const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("Shop context must be used within an ShopProvider");
  }

  return context;
};

export default useShop;
