import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { UploadedFile } from "~pages/CreateRecipe/components/Upload/Upload";

import { recipeSchema } from "./recipe.schema";
import { RecipeContextType, RecipeFormType } from "./recipe.type";

const recipeFormDefaultValues: RecipeFormType = {
  name: "",
  ingredients: [{ ingredient_id: "", amount: 0, unit_id: "" }],
  steps: "",
  time: 0,
  level: "",
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
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onSubmit = useCallback(
    (values: RecipeFormType) => {
      console.log(values);
      setFiles([]);
      form.reset();
    },
    [form],
  );

  const onUpload = useCallback(
    (files: UploadedFile[], field: ControllerRenderProps<RecipeFormType, "images">) => {
      setFiles([...files]);
      field.onChange([...files]);
      console.log("field", field);
    },
    [setFiles],
  );

  return (
    <RecipeContext.Provider value={{ form, onSubmit, files, onUpload }}>
      {children || <Outlet />}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
