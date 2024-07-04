import { useContext } from "react";

import { MealKitContext } from "~contexts/meal-kit/MealKitContext";

// Create consumer
const useMealKit = () => {
  const context = useContext(MealKitContext);

  if (!context) {
    throw new Error("MealKit context must be used within an MealKitProvider");
  }

  return context;
};

export default useMealKit;
