import { memo } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { CheckedState } from "@radix-ui/react-checkbox";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~components/ui/accordion";
import { Checkbox } from "~components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "~components/ui/form";
import { ShopFormType } from "~contexts/shop/shop.type";
import useShop from "~hooks/useShop";

const Filter = memo(() => {
  const { form, sidebarFilters, onSubmit } = useShop();

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
