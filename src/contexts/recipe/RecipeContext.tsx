import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createRecipe,
  GET_RECIPE_DETAIL_QUERY_KEY,
  getRecipe,
  updateRecipe,
  updateRecipeIngredients,
  updateRecipeMealKit,
  updateRecipeNutrition,
} from "~apis/recipe.api";
import { GET_TABLE_UNITS_STALE_TIME, GET_UNITS_QUERY_KEY, getUnits } from "~apis/unit.api";
import { UploadedFile } from "~pages/CreateRecipe/components/Upload/Upload";
import {
  TableViewRecipeType,
  UpdateIngredientBody,
  UpdateMealKitBody,
  UpdateNutritionBody,
  UpdateRecipeBody,
} from "~types/recipe.type";
import { RECIPE_MESSAGES } from "~utils/constants";
import { convertUrlsToFiles } from "~utils/convertURLtoFile";
import { LevelCook } from "~utils/enums";
import isAxiosError from "~utils/isAxiosError";

import { recipeSchema } from "./recipe.schema";
import { RecipeContextType, RecipeFormType } from "./recipe.type";

const recipeFormDefaultValues: RecipeFormType = {
  name: "",
  ingredients: [{ ingredient_id: "", amount: 0, price: 0, unit_id: "" }],
  deletedIngredients: [],
  steps: "",
  time: 0,
  level: LevelCook.EASY,
  nutrition: [{ nutrition_id: "", amount: 0, unit_id: "" }],
  deletedNutrition: [],
  category: "",
  images: [],
  videoUrl: "",
  foodStyleObj: {},
  mealKits: [
    {
      mealKit: {
        serving: 1,
        price: 0,
      },
      extraSpice: {
        imageName: "",
        name: "",
        price: 0,
        image: new File([""], "filename", { type: "image/png" }),
      },
    },
  ],
  deletedMealKits: [],
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const RecipeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { recipeId } = useParams();
  const [total, setTotal] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: recipeDetail } = useQuery({
    queryKey: [GET_RECIPE_DETAIL_QUERY_KEY],
    queryFn: () => getRecipe(recipeId as string),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
    enabled: !!recipeId,
  });

  const { data } = useQuery({
    queryKey: [GET_UNITS_QUERY_KEY],
    queryFn: () => getUnits(),
    select: (data) => data.data.data,
    staleTime: GET_TABLE_UNITS_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const initializeFormDefaults = (recipeData: TableViewRecipeType) => {
    return {
      name: recipeData.name || "",
      ingredients:
        recipeData.ingredients.map((ingredient) => {
          return {
            ...ingredient,
            oldId: ingredient.id || "",
          };
        }) || [],
      deletedIngredients: [],
      category: recipeData.category || "",
      foodStyleObj: recipeData.foodStyles || {},
      steps: recipeData.steps || "",
      nutrition:
        recipeData.nutrition.map((nutrition) => {
          return {
            ...nutrition,
            oldId: nutrition.id || "",
          };
        }) || [],
      deletedNutrition: [],
      mealKits:
        recipeData.mealKits.map((mealKit) => ({
          mealKit: {
            oldId: mealKit.id || "",
            serving: mealKit.serving || 1,
            price: mealKit.price || 1,
          },
          extraSpice: {
            oldId: mealKit.extraSpice?.id || "",
            imageName: mealKit.extraSpice?.name || "",
            name: mealKit.extraSpice?.name || "",
            price: mealKit.extraSpice?.price || 0,
            image: new File([], "image", { type: "image/jpeg" }),
          },
        })) || [],
      videoUrl: recipeData.videoUrl || "",
      images: [],
      time: recipeData.time || 0,
      level: recipeData.level || LevelCook.EASY,
      deletedMealKits: [],
    };
  };
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<RecipeFormType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipeFormDefaultValues,
  });

  const handleCalculateTotal = useCallback(() => {
    const ingredients = form.getValues("ingredients");
    if (!ingredients.length || !ingredients[0].ingredient_id) return;
    const totalPrice = ingredients.reduce((acc, row) => acc + (row.price || 0) * (row.amount || 0), 0);
    setTotal(totalPrice);
  }, [form]);

  useEffect(() => {
    const fetchData = async () => {
      if (recipeId && recipeDetail) {
        const defaultValues = initializeFormDefaults(recipeDetail);
        form.reset(defaultValues);

        setTotal(defaultValues.mealKits[0]?.mealKit.price || 0);
        const files = await convertUrlsToFiles(recipeDetail.images);
        setIsEditMode(true);
        setFiles(files);
        setImages(recipeDetail.mealKits.map((mealKit) => mealKit.extraSpice?.image || ""));
      }
    };
    fetchData();
  }, [recipeId, recipeDetail, form]);

  const { mutate: createMutate } = useMutation({
    mutationFn: (body: RecipeFormType) => createRecipe(body),
  });

  const { mutateAsync: updateIngredientsMutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateIngredientBody }) => updateRecipeIngredients(id, body),
  });

  const { mutateAsync: updateNutritionMutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateNutritionBody }) => updateRecipeNutrition(id, body),
  });

  const { mutateAsync: updateMealKitMutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateMealKitBody }) => updateRecipeMealKit(id, body),
  });

  const { mutateAsync: updateRecipeMutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateRecipeBody }) => updateRecipe(id, body),
  });

  const handleCreateRecipe = useCallback(
    (values: RecipeFormType) => {
      setIsLoading(true);

      createMutate(values, {
        onSuccess: () => {
          setFiles([]);
          form.reset();
          setTotal(0);
          toast.success(RECIPE_MESSAGES.CREATE_RECIPE_SUCCESS);
          setIsLoading(false);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) {
            toast.error(error.response?.data.message || RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
          } else {
            toast.error(RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
          }
          setIsLoading(false);
        },
      });
    },
    [form, createMutate],
  );

  const handleUpdateRecipe = useCallback(
    async (values: RecipeFormType) => {
      // Update recipe
      await updateRecipeMutate(
        {
          id: recipeId as string,
          body: {
            name: values.name,
            category: values.category,
            foodStyles: Object.values(values.foodStyleObj),
            steps: values.steps,
            time: values.time,
            level: values.level,
            videoUrl: values.videoUrl,
          },
        },
        {
          onError: (error) => {
            if (isAxiosError<Error>(error)) {
              toast.error(error.response?.data.message || RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            } else {
              toast.error(RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            }
            setIsLoading(false);
          },
        },
      );

      await updateIngredientsMutate(
        {
          id: recipeId as string,
          body: {
            ingredients: values.ingredients.map((ingredient) => ({
              ...ingredient,
              id: ingredient.oldId,
            })),
            removeIds: values.deletedIngredients,
          },
        },
        {
          onError: (error) => {
            if (isAxiosError<Error>(error)) {
              toast.error(error.response?.data.message || RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            } else {
              toast.error(RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            }
            setIsLoading(false);
          },
        },
      );

      await updateNutritionMutate(
        {
          id: recipeId as string,
          body: {
            nutrition: values.nutrition.map((nutrition) => ({
              ...nutrition,
              id: nutrition.oldId,
            })),
            removeIds: values.deletedNutrition,
          },
        },
        {
          onError: (error) => {
            if (isAxiosError<Error>(error)) {
              toast.error(error.response?.data.message || RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            } else {
              toast.error(RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            }
            setIsLoading(false);
          },
        },
      );

      await updateMealKitMutate(
        {
          id: recipeId as string,
          body: {
            mealKits: values.mealKits.map((mealKit) => ({
              mealKit: {
                ...mealKit.mealKit,
                id: mealKit.mealKit.oldId,
              },
              extraSpice: {
                name: mealKit.extraSpice.name,
                price: mealKit.extraSpice.price,
                id: mealKit.extraSpice.oldId,
              },
            })),
            removeIds: values.deletedNutrition,
          },
        },
        {
          onSuccess: () => {
            // setFiles([]);
            // form.reset();
            // setTotal(0);
            toast.success(RECIPE_MESSAGES.UPDATE_RECIPE_SUCCESS);
            setIsLoading(false);
          },
          onError: (error) => {
            if (isAxiosError<Error>(error)) {
              toast.error(error.response?.data.message || RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            } else {
              toast.error(RECIPE_MESSAGES.CREATE_RECIPE_FAILED);
            }
            setIsLoading(false);
          },
        },
      );
    },
    [recipeId, updateIngredientsMutate, updateNutritionMutate, updateMealKitMutate, updateRecipeMutate],
  );

  const onSubmit = useCallback(
    (values: RecipeFormType) => {
      if (isEditMode) {
        // Update recipe
        handleUpdateRecipe(values);
      } else {
        // Create recipe
        handleCreateRecipe(values);
      }
    },
    [handleCreateRecipe, isEditMode, handleUpdateRecipe],
  );

  const onUpload = useCallback(
    (files: UploadedFile[], field: ControllerRenderProps<RecipeFormType, "images">) => {
      setFiles([...files]);
      field.onChange([...files]);
    },
    [setFiles],
  );

  return (
    <RecipeContext.Provider
      value={{
        form,
        onSubmit,
        files,
        onUpload,
        units: data ? data : [],
        handleCalculateTotal,
        total,
        isLoading,
        images,
        isEditMode,
      }}
    >
      {children || <Outlet />}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
