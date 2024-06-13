import { FocusEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";

import { GET_FOOD_STYLES_QUERY_KEY, getFoodStyles } from "~apis/food-styles.api";
import Combobox from "~components/common/Combobox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import { RecipeFormType } from "~contexts/recipe/recipe.type";
import useDebounce from "~hooks/useDebounce";
import useRecipe from "~hooks/useRecipe";
import inputOnlyPositiveNumber from "~utils/inputOnlyPositiveNumber";

type RecipeObjectType = {
  name?: keyof RecipeFormType;
  type: keyof RecipeFormType;
  title: string;
  component: (field: ControllerRenderProps<RecipeFormType, keyof RecipeFormType>) => JSX.Element;
};

const MIN_VALUE = 1;
const MAX_VALUE = 99;

const CategoriesFields = () => {
  const { form } = useRecipe();
  const { data } = useQuery({
    queryKey: [GET_FOOD_STYLES_QUERY_KEY],
    queryFn: () => getFoodStyles(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.target.value === "" && (e.target.value = String(MIN_VALUE)) && setQuantityValue(1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const _e = inputOnlyPositiveNumber(e, 1, 99);
    setQuantityValue(Number(_e.currentTarget.value));
  };

  const handleValueChange = (value: string) => setQuantityValue(Number(value));

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
        title: "Thời gian nấu",
        component: () => (
          <FormControl>
            <Input
              type="number"
              min={1}
              max={99}
              defaultValue={"1"}
              placeholder="Số lượng"
              className=" ml-auto mr-auto"
              onKeyDown={(e) => handleKeyDown(e)}
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleValueChange(e.target.value)}
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
  const [quantityValue, setQuantityValue] = useState<number>();
  const quantityDebounce = useDebounce(quantityValue, 500);

  useEffect(() => {
    if (quantityDebounce && quantityDebounce >= MIN_VALUE && quantityDebounce <= MAX_VALUE) {
      console.log(` ${quantityDebounce}`);
    }
  }, [quantityDebounce]);

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
