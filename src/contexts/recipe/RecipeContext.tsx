import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { createRecipe } from "~apis/recipe.api";
import { GET_TABLE_UNITS_STALE_TIME, GET_UNITS_QUERY_KEY, getUnits } from "~apis/unit.api";
import { UploadedFile } from "~pages/CreateRecipe/components/Upload/Upload";
import { RECIPE_MESSAGES } from "~utils/constants";
import { LevelCook } from "~utils/enums";
import isAxiosError from "~utils/isAxiosError";

import { recipeSchema } from "./recipe.schema";
import { RecipeContextType, RecipeFormType } from "./recipe.type";

const recipeFormDefaultValues: RecipeFormType = {
  name: "",
  ingredients: [{ ingredient_id: "", amount: 0, unit_id: "" }],
  steps: "",
  time: 0,
  level: LevelCook.EASY,
  nutrition: [{ nutrition_id: "", amount: 0, unit_id: "" }],
  category: "",
  images: [],
  videoUrl: "",
  foodStyleObj: {},
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const RecipeProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<RecipeFormType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipeFormDefaultValues,
  });
  const { mutate: createMutate } = useMutation({
    mutationFn: (body: RecipeFormType) => createRecipe(body),
  });

  const { data } = useQuery({
    queryKey: [GET_UNITS_QUERY_KEY],
    queryFn: () => getUnits(),
    select: (data) => data.data.data,
    staleTime: GET_TABLE_UNITS_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onSubmit = useCallback(
    (values: RecipeFormType) => {
      createMutate(values, {
        onSuccess: () => {
          setFiles([]);
          form.reset();
          toast.success(RECIPE_MESSAGES.CREATE_RECIPE_SUCCESS);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) {
            toast.error(error.response?.data.message || RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
          } else {
            toast.error(RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
          }
        },
      });
    },
    [form, createMutate],
  );

  const onUpload = useCallback(
    (files: UploadedFile[], field: ControllerRenderProps<RecipeFormType, "images">) => {
      setFiles([...files]);
      field.onChange([...files]);
    },
    [setFiles],
  );

  return (
    <RecipeContext.Provider value={{ form, onSubmit, files, onUpload, units: data ? data : [] }}>
      {children || <Outlet />}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
