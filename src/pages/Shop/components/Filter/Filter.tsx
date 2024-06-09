import { memo, useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";

import { GET_FOOD_STYLES_QUERY_KEY, getFoodStyles } from "~apis/food-styles.api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~components/ui/accordion";
import { Checkbox } from "~components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "~components/ui/form";
import { ShopFormType } from "~contexts/shop/shop.type";
import useShop from "~hooks/useShop";
import { SidebarOptionType, SidebarType } from "~types/food-styles.type";

const priceOptions: SidebarOptionType[] = [
  {
    id: "below-100000",
    name: "0 - 100.000VNĐ",
    slug: "below-100000",
  },
  {
    id: "100000-200000",
    name: "100.000 - 200.000VNĐ",
    slug: "100000-200000",
  },
  {
    id: "200000-300000",
    name: "200.000 - 300.000VNĐ",
    slug: "200000-300000",
  },
  {
    id: "300000-400000",
    name: "300.000 - 400.000VNĐ",
    slug: "300000-400000",
  },
  {
    id: "above-500000",
    name: "Hơn 500.000VNĐ",
    slug: "above-500000",
  },
];

const evaluateOptions: SidebarOptionType[] = [
  {
    id: "1",
    name: "1.0 ⭐",
    slug: "1",
  },
  {
    id: "2",
    name: "2.0 ⭐⭐",
    slug: "2",
  },
  {
    id: "3",
    name: "3.0 ⭐⭐⭐",
    slug: "3",
  },
  {
    id: "4",
    name: "4.0 ⭐⭐⭐⭐",
    slug: "4",
  },
  {
    id: "5",
    name: "5.0 ⭐⭐⭐⭐⭐",
    slug: "5",
  },
];

const sidebarDefaultData: SidebarType[] = [
  {
    type: "price",
    title: "Giá tiền",
    data: priceOptions,
  },
  {
    type: "evaluate",
    title: "Đánh giá",
    data: evaluateOptions,
  },
];

const Filter = memo(() => {
  const { form, onSubmit } = useShop();
  const { data } = useQuery({
    queryKey: [GET_FOOD_STYLES_QUERY_KEY],
    queryFn: () => getFoodStyles(),
  });
  const [sidebarFilters, setSidebarFilters] = useState<SidebarType[]>(sidebarDefaultData);

  useEffect(() => {
    const foodStyles = data && data.data.data;
    if (!foodStyles) return;
    setSidebarFilters((prev) => [...foodStyles, ...prev]);
  }, [data]);

  const handleCheckedChange = (
    field: ControllerRenderProps<ShopFormType, `sidebar.${string}`>,
    checked: CheckedState,
    slug: string,
  ) => {
    checked ? field.onChange([...field.value, slug]) : field.onChange(field.value?.filter((value) => value !== slug));
    form.handleSubmit(onSubmit)();
  };

  return sidebarFilters.map((filter) => (
    <FormField
      key={filter.type}
      control={form.control}
      name={`sidebar.${filter.type}`}
      render={() => (
        <FormItem>
          <Accordion type="single" collapsible defaultValue={filter.type}>
            <AccordionItem value={filter.type}>
              <AccordionTrigger className="text-[#191720] text-lg font-bold leading-[30px]">
                {filter.title}
              </AccordionTrigger>
              <AccordionContent className="[&>*]:mb-5">
                {filter.data.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`sidebar.${filter.type}`}
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.slug)}
                              onCheckedChange={(checked) => handleCheckedChange(field, checked, item.slug)}
                            />
                          </FormControl>
                          <FormLabel className="text-[#575363] text-base font-normal leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {item.name}
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
