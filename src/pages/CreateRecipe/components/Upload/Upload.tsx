import { ControllerRenderProps } from "react-hook-form";

import FileUploader from "~components/common/Upload/FileUploader";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { RecipeFormType } from "~contexts/recipe/recipe.type";
import useRecipe from "~hooks/useRecipe";

export interface UploadedFile extends File {
  preview: string;
}

const MAX_FILES = 4;
const MAX_SIZE = 4 * 1024 * 1024;

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
                maxFiles={MAX_FILES}
                maxSize={MAX_SIZE}
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
