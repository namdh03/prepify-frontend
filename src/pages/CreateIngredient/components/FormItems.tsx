import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { GET_INGREDIENTS_QUERY_KEY, GET_TABLE_INGREDIENTS_STALE_TIME, getIngredients } from "~apis/ingredient.api";
import { GET_TABLE_UNITS_STALE_TIME, GET_UNITS_QUERY_KEY, getUnits } from "~apis/unit.api";
import Combobox from "~components/common/Combobox";
import InputPositiveNumber from "~components/common/InputPositiveNumber";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import useIngredient from "~hooks/useIngredient";
import { IngredientType } from "~types/ingredient.type";
import { UnitEnum } from "~utils/enums";

const FormItems = () => {
  const { form } = useIngredient();
  const [preview, setPreview] = useState<string>("");
  const { data: units } = useQuery({
    queryKey: [GET_UNITS_QUERY_KEY],
    queryFn: () => getUnits(),
    select: (data) => data.data.data,
    staleTime: GET_TABLE_UNITS_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const { data: ingredients } = useQuery({
    queryKey: [GET_INGREDIENTS_QUERY_KEY],
    queryFn: () => getIngredients(),
    select: (data) => data.data.data,
    staleTime: GET_TABLE_INGREDIENTS_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const getUniqueCategories = (ingredients: IngredientType[]) => {
    const categories = ingredients.map((ingredient) => ingredient.category);
    return [...new Set(categories)];
  };

  return (
    <div>
      <FormField
        control={form.control}
        name={"name"}
        render={({ field }) => (
          <FormItem className="flex flex-col w-[500px]">
            <FormLabel>Tên nguyên liệu</FormLabel>
            <FormControl>
              <Input
                type="text"
                value={field.value as string}
                onChange={field.onChange}
                placeholder="Nhập tên nguyên liệu"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-row flex-wrap gap-3 items-start justify-between my-6 ">
        <FormField
          control={form.control}
          name={"price"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-60">
              <FormLabel>Giá (/đơn vị)</FormLabel>
              <FormControl>
                <InputPositiveNumber
                  value={field.value as number}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  placeholder="Nhập giá"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"unit"}
          render={({ field }) => (
            <FormItem className="flex flex-col w-60">
              <FormLabel>Đơn vị</FormLabel>
              <FormControl>
                <Combobox
                  options={
                    units
                      ?.filter((item) => item.type == UnitEnum.INGREDIENT)
                      .map((item) => ({
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
      </div>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full my-8">
            <FormLabel>Phân loại</FormLabel>
            <FormControl>
              <Combobox
                options={
                  getUniqueCategories(ingredients || [])?.map((item: string) => ({
                    value: item,
                    label: item,
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

      <FormField
        control={form.control}
        name="imageURL"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full my-8">
            <FormLabel>Ảnh nguyên liệu</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Đường dẫn ảnh"
                className="h-10 bg-white"
                {...field}
                value={field.value}
                onChange={(event) => {
                  field.onChange(event.target.value); // Update form state
                  setPreview(event.target.value); // Update preview state
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {preview && (
        <div className="flex flex-row gap-4 ">
          <img src={preview} alt="preview" className="w-40 h-40 rounded-md object-cover" />
        </div>
      )}
    </div>
  );
};

export default FormItems;
