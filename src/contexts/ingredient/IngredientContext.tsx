import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { createIngredient } from "~apis/ingredient.api";
import { INGREDIENT_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

import { ingredientSchema } from "./ingredient.schema";
import { IngredientContextType, IngredientFormType } from "./ingredient.type";

const ingredientFormDefaultValues: IngredientFormType = {
  name: "",
  price: 1,
  unit: "",
  category: "",
  imageURL: "",
};

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

const IngredientProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<IngredientFormType>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: ingredientFormDefaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createMutate } = useMutation({
    mutationFn: (body: IngredientFormType) => createIngredient(body),
  });

  const onSubmit = useCallback(
    (values: IngredientFormType) => {
      createMutate(values, {
        onSuccess: () => {
          form.reset();
          toast.success(INGREDIENT_MESSAGES.CREATE_INGREDIENT_SUCCESS);
          setIsLoading(false);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) {
            toast.error(error.response?.data.message || INGREDIENT_MESSAGES.CREATE_INGREDIENT_FAILED);
          } else {
            toast.error(INGREDIENT_MESSAGES.CREATE_INGREDIENT_FAILED);
          }
          setIsLoading(false);
        },
      });
    },
    [createMutate, form],
  );

  return (
    <IngredientContext.Provider value={{ form, onSubmit, isLoading }}>
      {children || <Outlet />}
    </IngredientContext.Provider>
  );
};

export { IngredientContext, IngredientProvider };
