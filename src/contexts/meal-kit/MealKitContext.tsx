import { createContext, FC, PropsWithChildren, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { mealKitSchema } from "./meal-kit.schema";
import { MealKitContextType, MealKitFormType } from "./meal-kit.type";

const mealKitFormDefaultValues: MealKitFormType = {
  name: "",
  mealKits: [
    {
      mealKit: {
        serving: 1,
        price: 1,
      },
      extraSpice: {
        name: "",
        price: 0,
        image: new File([""], "filename", { type: "image/png" }),
      },
    },
  ],
};

const MealKitContext = createContext<MealKitContextType | undefined>(undefined);

const MealKitProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<MealKitFormType>({
    resolver: zodResolver(mealKitSchema),
    defaultValues: mealKitFormDefaultValues,
  });

  const onSubmit = useCallback((values: MealKitFormType) => {
    console.log(values);
  }, []);

  return <MealKitContext.Provider value={{ form, onSubmit }}>{children || <Outlet />}</MealKitContext.Provider>;
};

export { MealKitContext, MealKitProvider };
