import { memo } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { CheckedState } from "@radix-ui/react-checkbox";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~components/ui/accordion";
import { Checkbox } from "~components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "~components/ui/form";
import { ShopFormType } from "~contexts/shop/shop.type";
import useShop from "~hooks/useShop";
import { ShopFoodStyleItem } from "~types/food-styles.type";
import { PAGE } from "~utils/constants";

interface FilterProps {
  sidebarFilters: ShopFoodStyleItem[];
}

const Filter = memo(({ sidebarFilters }: FilterProps) => {
  const { form, onSubmit } = useShop();

  const handleCheckedChange = (
    field: ControllerRenderProps<ShopFormType, `sidebar.${string}`>,
    checked: CheckedState,
    slug: string,
  ) => {
    checked
      ? field.onChange([...(field.value || []), slug])
      : field.onChange(field.value?.filter((value) => value !== slug));
    form.setValue("page", PAGE);
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
