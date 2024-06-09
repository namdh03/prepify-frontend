import { memo, MutableRefObject } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import Combobox from "~components/common/Combobox";
import { ComboboxOption } from "~components/common/Combobox/Combobox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import { Textarea } from "~components/ui/textarea";
import { ModalFormType } from "~contexts/checkout/checkout.type";
import { USER_MESSAGES } from "~utils/constants";

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

const districts: ComboboxOption[] = [
  {
    value: "quan-1",
    label: "Quận 1",
  },
  {
    value: "quan-3",
    label: "Quận 3",
  },
  {
    value: "quan-4",
    label: "Quận 4",
  },
  {
    value: "quan-5",
    label: "Quận 5",
  },
  {
    value: "quan-6",
    label: "Quận 6",
  },
  {
    value: "quan-7",
    label: "Quận 7",
  },
  {
    value: "quan-8",
    label: "Quận 8",
  },
  {
    value: "quan-10",
    label: "Quận 10",
  },
  {
    value: "quan-11",
    label: "Quận 11",
  },
  {
    value: "quan-12",
    label: "Quận 12",
  },
  {
    value: "quan-tan-binh",
    label: "Quận Tân Bình",
  },
  {
    value: "quan-binh-tan",
    label: "Quận Bình Tân",
  },
  {
    value: "quan-binh-thanh",
    label: "Quận Bình Thạnh",
  },
  {
    value: "quan-tan-phu",
    label: "Quận Tân Phú",
  },
  {
    value: "quan-go-vap",
    label: "Quận Gò Vấp",
  },
  {
    value: "quan-phu-nhuan",
    label: "Quận Phú Nhuận",
  },
  {
    value: "huyen-binh-chanh",
    label: "Huyện Bình Chánh",
  },
  {
    value: "huyen-hoc-mon",
    label: "Huyện Hóc Môn",
  },
  {
    value: "huyen-can-gio",
    label: "Huyện Cần Giờ",
  },
  {
    value: "huyen-cu-chi",
    label: "Huyện Củ Chi",
  },
  {
    value: "huyen-nha-be",
    label: "Huyện Nhà Bè",
  },
];

const FormItems = memo(({ form, districtLabel }: FormItemsProps) => {
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
          width="100%"
        />
      ),
    },
    {
      name: "address",
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
