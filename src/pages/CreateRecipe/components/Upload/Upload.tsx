import { ControllerRenderProps } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { RecipeFormType } from "~contexts/recipe/recipe.type";
import useRecipe from "~hooks/useRecipe";

import { FileUploader } from "./FileUploader";

export interface UploadedFile extends File {
  preview: string;
}

export default function Upload() {
  const { form, files, onUpload } = useRecipe();

  const handleUpload = (files: UploadedFile[], field: ControllerRenderProps<RecipeFormType, "images">) => {
    onUpload(files, field);
  };

  return (
    <FormField
      control={form.control}
      key="images"
      name="images"
      render={({ field }) => (
        <FormItem className="flex flex-col max-w-[500px] my-8">
          <FormLabel>Hình</FormLabel>
          <FormControl>
            <div className="space-y-6">
              <FileUploader
                maxFiles={4}
                maxSize={4 * 1024 * 1024}
                files={files}
                handleUpload={(files) => handleUpload(files, field)}
                disabled={false}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
