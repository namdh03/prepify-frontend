import { memo, MutableRefObject, useMemo } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import Combobox from "~components/common/Combobox";
import { ComboboxOption } from "~components/common/Combobox/Combobox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import { Textarea } from "~components/ui/textarea";
import useCheckout from "~hooks/useCheckout";
import { USER_MESSAGES } from "~utils/constants";

import { ModalFormType } from "../Modal/Modal";

interface FormItemsProps {
  form: UseFormReturn<ModalFormType>;
  districtLabel: MutableRefObject<string>;
}

type ModalObjectType = {
  name: keyof ModalFormType;
  label: string;
  component: (field: ControllerRenderProps<ModalFormType, keyof ModalFormType>) => JSX.Element;
  description?: string;
};

const FormItems = memo(({ form, districtLabel }: FormItemsProps) => {
  const { checkout } = useCheckout();
  const districts: ComboboxOption[] = useMemo(
    () =>
      checkout?.area.map((district) => ({
        value: district.id,
        label: district.name,
      })) || [],
    [checkout],
  );
  const modalFields: ModalObjectType[] = [
    {
      name: "phone",
      label: "Số điện thoại",
      component: (field) => (
        <FormControl>
          <Input placeholder="Số điện thoại" {...field} />
        </FormControl>
      ),
    },
    {
      name: "city",
      label: "Thành phố",
      component: (field) => (
        <FormControl>
          <Input placeholder="Thành phố" {...field} disabled />
        </FormControl>
      ),
      description: USER_MESSAGES.ADDRESS_MESSAGE,
    },
    {
      name: "district",
      label: "Quận, Huyện",
      component: (field) => (
        <Combobox
          options={districts}
          onValueChange={(value, label) => {
            field.onChange(value);
            districtLabel.current = label || "";
          }}
          value={field.value as string}
          placeholder="Chọn quận, huyện"
          notFoundText="Không tìm thấy quận, huyện"
        />
      ),
    },
    {
      name: "specificAddress",
      label: "Địa chỉ cụ thể",
      component: (field) => (
        <FormControl>
          <Textarea placeholder="Số nhà, tòa chung cư" className="resize-none" {...field} />
        </FormControl>
      ),
    },
  ];

  return modalFields.map(({ name, label, component, description }) => (
    <FormField
      control={form.control}
      key={name}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          {component(field)}
          <FormMessage />
          <FormDescription>{description}</FormDescription>
        </FormItem>
      )}
    />
  ));
});

export default FormItems;
