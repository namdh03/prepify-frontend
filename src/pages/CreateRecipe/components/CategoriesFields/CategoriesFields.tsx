import { useEffect, useMemo, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";

import { GET_FOOD_STYLES_QUERY_KEY, getFoodStyles } from "~apis/food-styles.api";
import Combobox from "~components/common/Combobox";
import InputPositiveNumber from "~components/common/InputPositiveNumber";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { RecipeFormType } from "~contexts/recipe/recipe.type";
import useRecipe from "~hooks/useRecipe";

type RecipeObjectType = {
  name?: keyof RecipeFormType;
  type: keyof RecipeFormType;
  title: string;
  component: (field: ControllerRenderProps<RecipeFormType, keyof RecipeFormType>) => JSX.Element;
};

const CategoriesFields = () => {
  const { form } = useRecipe();
  const { data } = useQuery({
    queryKey: [GET_FOOD_STYLES_QUERY_KEY],
    queryFn: () => getFoodStyles(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const defaultFields: RecipeObjectType[] = useMemo(
    () => [
      {
        type: "level",
        title: "Độ Khó",
        component: (field) => (
          <Combobox
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            onValueChange={field.onChange}
            value={field.value as string}
            placeholder="Chọn mức độ"
            notFoundText="Không tìm thấy mức độ"
          />
        ),
      },
      {
        type: "time",
        title: "Thời gian nấu (phút)",
        component: (field) => (
          <FormControl>
            <InputPositiveNumber
              value={field.value as number}
              placeholder="Nhập thời gian nấu"
              onValueChange={(value) => {
                field.onChange(value);
              }}
            />
          </FormControl>
        ),
      },
      {
        type: "category",
        title: "Phân loại",
        component: (field) => (
          <Combobox
            options={[
              { value: "nuoc", label: "Món nước" },
              { value: "kho", label: "Món khô" },
              { value: "nuong", label: "Món nướng" },
            ]}
            onValueChange={field.onChange}
            value={field.value as string}
            placeholder="Chọn phân loại"
            notFoundText="Không tìm thấy phân loại"
          />
        ),
      },
    ],
    [],
  );
  const [dynamicFields, setDynamicFields] = useState<RecipeObjectType[]>(defaultFields);

  useEffect(() => {
    const foodStyles = data && data.data.data;
    if (!foodStyles) return;
    const newFoodStyle: RecipeObjectType[] = foodStyles.map((foodStyle) => ({
      name: "foodStyleObj",
      type: foodStyle.type as keyof RecipeFormType,
      title: foodStyle.title,
      component: (field) => {
        const value = (field.value as Record<string, string>) || {};
        return (
          <Combobox
            width="w-36"
            options={foodStyle.data.map((item) => ({ value: item.id, label: item.name }))}
            onValueChange={(val) => {
              const updatedValue = {
                ...value,
                [foodStyle.type]: val,
              };
              field.onChange(updatedValue);
            }}
            value={value[foodStyle.type] || ""}
            placeholder={`Chọn ${foodStyle.title.toLowerCase()} `}
            notFoundText={`Không tình thấy ${foodStyle.title.toLowerCase()} `}
          />
        );
      },
    }));
    setDynamicFields((prev) => [...prev, ...newFoodStyle]);

    return () => {
      setDynamicFields(defaultFields);
    };
  }, [data, defaultFields]);

  return dynamicFields.map(({ name, type, title, component }) => (
    <FormField
      control={form.control}
      key={type}
      name={name ? name : type}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{title}</FormLabel>
          {component(field)}
          <FormMessage />
        </FormItem>
      )}
    />
  ));
};

export default CategoriesFields;
