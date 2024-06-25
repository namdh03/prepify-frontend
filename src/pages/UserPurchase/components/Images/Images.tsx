import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { Button } from "~components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "~components/ui/form";
import { Input } from "~components/ui/input";
import { cn } from "~lib/utils";
import getImageData from "~utils/getImageData";

import { FeedbackFormType } from "../Feedback/Feedback";

interface ImagesProps {
  orderItemIndex: number;
  form: UseFormReturn<FeedbackFormType>;
}

const Images = ({ orderItemIndex, form }: ImagesProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleClearImage = (index: number) => {
    form.setValue(
      `feedback.${orderItemIndex}.images`,
      form.getValues(`feedback.${orderItemIndex}.images`).filter((_, i) => i !== index),
    );
    form.clearErrors(`feedback.${orderItemIndex}.images.${index}`);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex items-center gap-3 mt-2 px-1">
        {imagePreviews.map((imagePreview, index) => (
          <div
            key={index}
            className={cn("relative w-24 h-24 border border-gray-300 rounded-md shadow-sm", {
              "border-destructive": form.formState.errors?.feedback?.[orderItemIndex]?.images?.[index]?.message,
            })}
          >
            <button
              onClick={() => handleClearImage(index)}
              className="absolute -top-2 -right-2 p-1 text-white bg-black bg-opacity-50 rounded-full shadow hover:bg-opacity-100 transition-colors duration-200 ease-in-out"
            >
              <RxCross2 />
            </button>
            <img src={imagePreview} alt="" className="w-full h-full object-cover rounded-md" />
          </div>
        ))}
      </div>

      <FormField
        key={orderItemIndex}
        control={form.control}
        name={`feedback.${orderItemIndex}.images`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="file"
                {...field}
                value={undefined}
                onChange={(event) => {
                  const { files, displayUrl } = getImageData(event);
                  // clear data in event
                  event.target.value = "";
                  // update form value
                  field.onChange([...(field.value || []), files[0]]);
                  setImagePreviews((prev) => [...prev, displayUrl]);
                }}
                className="hidden"
              />
            </FormControl>
            <Button type="button" variant={"outline"} className="p-0">
              <FormLabel className="flex items-center justify-center gap-1 p-4 w-full h-full cursor-pointer">
                <FaPlus />
                <span className="text-sm">Thêm ảnh</span>
              </FormLabel>
            </Button>

            {imagePreviews.map((_, index) => (
              <p key={index} className="text-xs text-destructive">
                {form.formState.errors?.feedback?.[orderItemIndex]?.images?.[index]?.message}
              </p>
            ))}
          </FormItem>
        )}
      />
    </>
  );
};

export default Images;
