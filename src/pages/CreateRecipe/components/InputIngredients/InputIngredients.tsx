import { useFieldArray } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

import { useQuery } from "@tanstack/react-query";

import { GET_INGREDIENTS_QUERY_KEY, GET_TABLE_INGREDIENTS_STALE_TIME, getIngredients } from "~apis/ingredient.api";
import Combobox from "~components/common/Combobox";
import InputFloatNumber from "~components/common/InputFloatNumber";
import { Button } from "~components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import useRecipe from "~hooks/useRecipe";

const InputIngredients = () => {
  const { form, units } = useRecipe();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });
  const { data } = useQuery({
    queryKey: [GET_INGREDIENTS_QUERY_KEY],
    queryFn: () => getIngredients(),
    select: (data) => data.data.data,
    staleTime: GET_TABLE_INGREDIENTS_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col justify-center">
      {fields.map((field, index) => (
        <div className="flex flex-row gap-3 items-start mt-8 mb-4" key={field.id}>
          <FormField
            control={form.control}
            name={`ingredients.${index}.ingredient_id`}
            render={({ field }) => (
              <FormItem className="flex flex-col w-52 ">
                <FormLabel>Nguyên liệu</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      data?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    placeholder="Chọn nguyên liệu"
                    notFoundText="Không tìm thấy nguyên liệu"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`ingredients.${index}.amount`}
            render={({ field }) => (
              <FormItem className="flex flex-col w-32">
                <FormLabel>Số lượng</FormLabel>
                <FormControl>
                  <InputFloatNumber
                    value={field.value as number}
                    placeholder={"Nhập số lượng"}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`ingredients.${index}.unit_id`}
            render={({ field }) => (
              <FormItem className="flex flex-col w-44">
                <FormLabel>Đơn vị</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      units.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    onValueChange={field.onChange}
                    value={field.value as string}
                    placeholder="Chọn đơn vị"
                    notFoundText="Không tìm thấy đơn vị"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {index > 0 && (
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                remove(index);
              }}
              className="my-auto"
            >
              <RxCross2 color="black" size={24} />
            </Button>
          )}
        </div>
      ))}
      <Button
        className="mt-5"
        type="button"
        onClick={() => {
          append({ ingredient_id: "", amount: 0, unit_id: "" });
        }}
      >
        + Thêm nguyên liệu
      </Button>
    </div>
  );
};

export default InputIngredients;
