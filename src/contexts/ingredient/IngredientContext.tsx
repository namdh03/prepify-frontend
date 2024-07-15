import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createIngredient,
  GET_INGREDIENT_DETAIL_QUERY_KEY,
  GET_TABLE_INGREDIENTS_QUERY_KEY,
  getIngredient,
  updateIngredient,
} from "~apis/ingredient.api";
import configs from "~configs";
import { INGREDIENT_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
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
  const { ingredientId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<IngredientFormType>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: ingredientFormDefaultValues,
  });

  const { data: ingredient, isSuccess } = useQuery({
    queryKey: [GET_INGREDIENT_DETAIL_QUERY_KEY],
    queryFn: () => getIngredient(ingredientId as string),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: createMutate } = useMutation({
    mutationFn: (body: IngredientFormType) => createIngredient(body),
  });

  const { mutate: updateMute } = useMutation({
    mutationFn: (body: IngredientFormType) => updateIngredient(ingredientId as string, body),
  });

  useEffect(() => {
    if (ingredient) {
      const ingredientDetail = {
        name: ingredient.name || "",
        price: ingredient.price || 0,
        unit: ingredient.unit.id || "",
        category: ingredient.category || "",
        imageURL: ingredient.imageURL || "",
      };
      form.reset(ingredientDetail);
    }
  }, [ingredient, form]);

  const onSubmit = useCallback(
    (values: IngredientFormType) => {
      if (!isSuccess) {
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
      } else {
        updateMute(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GET_INGREDIENT_DETAIL_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [GET_TABLE_INGREDIENTS_QUERY_KEY] });
            navigate(configs.routes.ingredientList);
            toast.success(INGREDIENT_MESSAGES.UPDATE_INGREDIENT_SUCCESS);
          },
          onError: (error) => {
            if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
            else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
          },
        });
      }
    },
    [isSuccess, createMutate, form, updateMute, queryClient, navigate],
  );

  return (
    <IngredientContext.Provider value={{ form, onSubmit, isLoading }}>
      {children || <Outlet />}
    </IngredientContext.Provider>
  );
};

export { IngredientContext, IngredientProvider };
