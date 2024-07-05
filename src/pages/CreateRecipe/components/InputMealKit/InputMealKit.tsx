import { ChangeEvent, useEffect, useState } from "react";
import { ControllerRenderProps, useFieldArray } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import InputFloatNumber from "~components/common/InputFloatNumber";
import InputPositiveNumber from "~components/common/InputPositiveNumber";
import { Avatar, AvatarImage } from "~components/ui/avatar";
import { Button } from "~components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import { RecipeFormType } from "~contexts/recipe/recipe.type";
import useRecipe from "~hooks/useRecipe";
import getImageData from "~utils/getImageData";

const InputMealKit = () => {
  const { form, total, images } = useRecipe();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "mealKits",
  });
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    setPreview(images);
    return form.setValue(`mealKits.${0}.mealKit.price`, total);
  }, [total, form, images]);

  useEffect(() => {
    return form.setValue(`mealKits.${fields.length - 1}.mealKit.price`, total * fields.length);
  }, [fields, form, total]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    field: ControllerRenderProps<RecipeFormType, `mealKits.${number}.extraSpice.image`>,
  ) => {
    const { files, displayUrl } = getImageData(event);
    if (files[0]) {
      const newName = `extraSpice_${index}_${files[0].name}`;
      const newFile = new File([files[0]], newName, { type: files[0].type });
      setPreview((prevPreview) => {
        const updatedPreview = [...prevPreview];
        updatedPreview[index] = displayUrl;
        return updatedPreview;
      }); // Update the state correctly
      field.onChange(newFile);
      // Update imageName directly in the state
      form.setValue(`mealKits.${index}.extraSpice.imageName`, newFile.name, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const handleServingChange = (index: number, value: number) => {
    const serving = value;
    const price = total * serving;
    form.setValue(`mealKits.${index}.mealKit.price`, price);
  };
  return (
    <>
      <div className="flex flex-col justify-center mt-4">
        {fields.map((field, index) => (
          <Card className="mt-4 w-[500px]" key={field.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Gói nguyên liệu {index + 1}</CardTitle>
                {index > 0 && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <RxCross2 color="black" size={24} />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row flex-wrap gap-3 items-start ">
                <div className="flex flex-row gap-6">
                  <FormField
                    control={form.control}
                    name={`mealKits.${index}.mealKit.serving`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-60">
                        <FormLabel>Khẩu phần</FormLabel>
                        <FormControl>
                          <InputPositiveNumber
                            disabled={index == 0}
                            value={(field.value as number) > index ? (field.value as number) : index + 1}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleServingChange(index, value as number);
                            }}
                            placeholder="Nhập số lượng"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`mealKits.${index}.mealKit.price`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-40 ">
                        <FormLabel>Giá</FormLabel>
                        <FormControl>
                          <InputFloatNumber
                            disabled={true}
                            value={field.value as number}
                            placeholder={"Nhập giá tiền"}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <CardTitle className="my-4">Gói gia vị</CardTitle>
                <div className="flex flex-row gap-6">
                  <FormField
                    control={form.control}
                    name={`mealKits.${index}.extraSpice.name`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-60">
                        <FormLabel>Tên gia vị</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            value={field.value as string}
                            onChange={field.onChange}
                            placeholder="Nhập tên gia vị"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`mealKits.${index}.extraSpice.price`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-40">
                        <FormLabel>Giá gói gia vị</FormLabel>
                        <FormControl>
                          <InputFloatNumber
                            value={field.value as number}
                            placeholder={"Nhập giá tiền"}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name={`mealKits.${index}.extraSpice.image`}
                    render={({ field }) => (
                      <FormItem className="w-full mt-3">
                        <FormMessage />
                        <Button type="button" variant="outline" className="w-full p-4 gap-2 ">
                          <MdOutlineFileUpload size={20} className="text-muted-foreground " />
                          <FormLabel className="flex items-center justify-center text-muted-foreground">
                            Đăng tải ảnh gia vị
                          </FormLabel>
                        </Button>
                        <FormControl>
                          <Input
                            type="file"
                            {...field}
                            value={undefined}
                            onChange={(event) => {
                              handleFileChange(event, index, field);
                            }}
                            className="hidden"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {preview.length > 0 && (
                    <Avatar className="w-14 h-14 mt-4">
                      <AvatarImage src={preview[index]} className="object-cover" />
                    </Avatar>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Button
          className="mt-5 gap-1"
          type="button"
          onClick={() =>
            append({
              mealKit: {
                serving: 1,
                price: 1,
              },
              extraSpice: {
                imageName: "",
                name: "",
                price: 0,
                image: new File([""], "filename", { type: "image/png" }),
              },
            })
          }
        >
          <AiOutlinePlus /> Thêm gói nguyên liệu
        </Button>
      </div>
    </>
  );
};

export default InputMealKit;
