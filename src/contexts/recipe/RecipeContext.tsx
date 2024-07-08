import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { createRecipe, GET_RECIPE_DETAIL_QUERY_KEY, getRecipe } from "~apis/recipe.api";
import { GET_TABLE_UNITS_STALE_TIME, GET_UNITS_QUERY_KEY, getUnits } from "~apis/unit.api";
import { UploadedFile } from "~pages/CreateRecipe/components/Upload/Upload";
import { TableViewRecipeType } from "~types/recipe.type";
import { RECIPE_MESSAGES } from "~utils/constants";
import { convertUrlsToFiles } from "~utils/convertURLtoFile";
import { LevelCook } from "~utils/enums";
import isAxiosError from "~utils/isAxiosError";

import { recipeSchema } from "./recipe.schema";
import { RecipeContextType, RecipeFormType } from "./recipe.type";

const recipeFormDefaultValues: RecipeFormType = {
  name: "",
  ingredients: [{ ingredient_id: "", amount: 0, price: 0, unit_id: "" }],
  steps: "",
  time: 0,
  level: LevelCook.EASY,
  nutrition: [{ nutrition_id: "", amount: 0, unit_id: "" }],
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
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const RecipeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { recipeId } = useParams();
  const [total, setTotal] = useState(0);

  const { data: recipeDetail } = useQuery({
    queryKey: [GET_RECIPE_DETAIL_QUERY_KEY],
    queryFn: () => getRecipe(recipeId as string),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
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
      ingredients: recipeData.ingredients || [],
      category: recipeData.category || "",
      foodStyleObj: recipeData.foodStyles || {},
      steps: recipeData.steps || "",
      nutrition: recipeData.nutrition || [],
      mealKits:
        recipeData.mealKits.map((mealKit) => ({
          mealKit: {
            serving: mealKit.serving || 1,
            price: mealKit.price,
          },
          extraSpice: {
            imageName: mealKit.extraSpice?.name || "",
            name: mealKit.extraSpice?.name || "",
            price: mealKit.extraSpice?.price || 0,
            image: new File([], "image", { type: "image/jpeg" }),
          },
        })) || [],
      videoUrl: recipeData.videoUrl || "",
      images: [],
      time: recipeData.time || 0,
    };
  };
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<RecipeFormType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipeFormDefaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (recipeId && recipeDetail) {
        form.reset(initializeFormDefaults(recipeDetail));
        setTotal(recipeDetail.mealKits[0].price);
        const files = await convertUrlsToFiles(recipeDetail.images);
        setFiles(files);
        setImages(recipeDetail.mealKits.map((mealKit) => mealKit.extraSpice?.image || ""));
      }
    };

    fetchData();
  }, [recipeId, recipeDetail, form]);

  const { mutate: createMutate } = useMutation({
    mutationFn: (body: RecipeFormType) => createRecipe(body),
  });

  const handleCalculateTotal = useCallback(() => {
    if (!form.getValues("ingredients").length || !form.getValues("ingredients")[0].ingredient_id) return;
    const totalPrice = form.getValues("ingredients").reduce((acc, row) => acc + row.price * row.amount, 0);
    setTotal(totalPrice);
  }, [form]);

  const onSubmit = useCallback(
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
      }}
    >
      {children || <Outlet />}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
