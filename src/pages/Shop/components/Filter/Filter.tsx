import { memo, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { CheckedState } from "@radix-ui/react-checkbox";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~components/ui/accordion";
import { Checkbox } from "~components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "~components/ui/form";
import { ShopFormType, SidebarOptionType, SidebarType } from "~contexts/shop/shop.type";
import useShop from "~hooks/useShop";

const cuisineOptions: SidebarOptionType[] = [
  {
    id: "vietnam",
    label: "Việt Nam",
  },
  {
    id: "korea",
    label: "Hàn Quốc",
  },
  {
    id: "thailand",
    label: "Thái Lan",
  },
  {
    id: "japan",
    label: "Nhật Bản",
  },
  {
    id: "europe",
    label: "Tây Âu",
  },
];

const dietOptions: SidebarOptionType[] = [
  {
    id: "eat-clean",
    label: "Eat clean",
  },
  {
    id: "vegetarian",
    label: "Thuần chay",
  },
  {
    id: "keto",
    label: "Ăn kiêng",
  },
  {
    id: "balance",
    label: "Cân bằng",
  },
];

const occasionOptions: SidebarOptionType[] = [
  {
    id: "personal",
    label: "Cá nhân",
  },
  {
    id: "couple",
    label: "Cặp đôi",
  },
  {
    id: "family",
    label: "Gia đình",
  },
  {
    id: "party",
    label: "Tiệc",
  },
];

const priceOptions: SidebarOptionType[] = [
  {
    id: "below-100000",
    label: "0 - 100.000VNĐ",
  },
  {
    id: "100000-200000",
    label: "100.000 - 200.000VNĐ",
  },
  {
    id: "200000-300000",
    label: "200.000 - 300.000VNĐ",
  },
  {
    id: "300000-400000",
    label: "300.000 - 400.000VNĐ",
  },
  {
    id: "above-500000",
    label: "Hơn 500.000VNĐ",
  },
];

const evaluateOptions: SidebarOptionType[] = [
  {
    id: "1",
    label: "1.0 ⭐",
  },
  {
    id: "2",
    label: "2.0 ⭐⭐",
  },
  {
    id: "3",
    label: "3.0 ⭐⭐⭐",
  },
  {
    id: "4",
    label: "4.0 ⭐⭐⭐⭐",
  },
  {
    id: "5",
    label: "5.0 ⭐⭐⭐⭐⭐",
  },
];

const sidebarDefaultData: SidebarType[] = [
  {
    key: "cuisine",
    title: "Ẩm thực",
    options: cuisineOptions,
  },
  {
    key: "diet",
    title: "Chế độ ăn",
    options: dietOptions,
  },
  {
    key: "occasion",
    title: "Dịp ăn",
    options: occasionOptions,
  },
  {
    key: "price",
    title: "Giá tiền",
    options: priceOptions,
  },
  {
    key: "evaluate",
    title: "Đánh giá",
    options: evaluateOptions,
  },
];

const Filter = memo(() => {
  const { form, onSubmit } = useShop();
  const [sidebarFilters] = useState<SidebarType[]>(sidebarDefaultData);

  const handleCheckedChange = (
    field: ControllerRenderProps<
      ShopFormType,
      "sidebar.cuisine" | "sidebar.diet" | "sidebar.occasion" | "sidebar.price" | "sidebar.evaluate"
    >,
    checked: CheckedState,
    id: string,
  ) => {
    checked ? field.onChange([...field.value, id]) : field.onChange(field.value?.filter((value) => value !== id));
    form.handleSubmit(onSubmit)();
  };

  return sidebarFilters.map((filter) => (
    <FormField
      key={filter.key}
      control={form.control}
      name={`sidebar.${filter.key}`}
      render={() => (
        <FormItem>
          <Accordion type="single" collapsible defaultValue={filter.key}>
            <AccordionItem value={filter.key}>
              <AccordionTrigger className="text-[#191720] text-lg font-bold leading-[30px]">
                {filter.title}
              </AccordionTrigger>
              <AccordionContent className="[&>*]:mb-5">
                {filter.options.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`sidebar.${filter.key}`}
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => handleCheckedChange(field, checked, item.id)}
                            />
                          </FormControl>
                          <FormLabel className="text-[#575363] text-base font-normal leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FormItem>
      )}
    />
  ));
});

export default Filter;
