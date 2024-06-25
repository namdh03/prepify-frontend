import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Combobox, { ComboboxOption } from "~components/common/Combobox/Combobox";
import { Button } from "~components/ui/button";
import {
  Form as FormShadcn,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~components/ui/form";
import { Input } from "~components/ui/input";
import { Textarea } from "~components/ui/textarea";
import { userProfileSchema } from "~pages/UserProfile/data/schema";

type UserProfileFormType = z.infer<typeof userProfileSchema>;

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

const Form = () => {
  const form = useForm<UserProfileFormType>({
    mode: "all",
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      city: "Hồ Chí Minh",
      district: "",
      specificAddress: "",
      restrictIngredients: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "restrictIngredients",
    control: form.control,
  });
  const [selectedRestrictIngredients, setSelectedRestrictIngredients] = useState<string[]>([]);

  // Set default selected value for restrictIngredients
  useEffect(() => {
    const valueFormAPI = [
      {
        id: "quan-5",
        value: "Quận 5",
      },
    ];

    setSelectedRestrictIngredients((prev) => [...prev, ...valueFormAPI.map((item) => item.id)]);
    form.setValue("restrictIngredients", valueFormAPI);
  }, [form]);

  const onSubmit = (values: UserProfileFormType) => {
    console.log(values);
  };

  return (
    <FormShadcn {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và Tên</FormLabel>
              <FormControl>
                <Input placeholder="Nguyen Van A" {...field} />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật hoặc bút danh của bạn
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                Bạn có thể quản lý các địa chỉ email đã xác minh trong cài đặt email của mình
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Địa chỉ</FormLabel>
          <FormDescription>Đây là địa chỉ nhận hàng của bạn</FormDescription>

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thành phố</FormLabel>
                <FormControl>
                  <Input placeholder="Hồ Chí Minh" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Quận, Huyện</FormLabel>
                <Combobox
                  options={districts}
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value as string}
                  placeholder="Chọn quận, huyện"
                  notFoundText="Không tìm thấy quận, huyện"
                  width="100%"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specificAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ cụ thể</FormLabel>
                <FormControl>
                  <Textarea placeholder="Số nhà, tòa chung cư" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormDescription>Lưu ý: Hệ thống chỉ hỗ trợ nhập địa chỉ tại TP. Hồ Chí Minh</FormDescription>
        </FormItem>

        <FormItem>
          <FormLabel>Các nguyên liệu, thành phần gây dị ứng</FormLabel>
          <FormDescription>
            Danh sách các nguyên liệu bạn có thể bị dị ứng. Bạn sẽ được cảnh bảo khi chọn các công thức có chứa các
            nguyên liệu trong danh sách này
          </FormDescription>
        </FormItem>

        <div className="[&_button:first-child]:flex-1">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`restrictIngredients.${index}.id`}
              render={({ field }) => (
                <FormItem className="flex flex-col mb-6">
                  <FormLabel>Nguyên liệu</FormLabel>
                  <div className="flex items-center gap-4">
                    <Combobox
                      options={districts}
                      selectedOption={selectedRestrictIngredients}
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Swap value in selectedRestrictIngredients and remove previous value
                        setSelectedRestrictIngredients((prev) => [
                          ...prev.filter((item) => item !== field.value),
                          value,
                        ]);
                      }}
                      value={field.value as string}
                      placeholder="Chọn nguyên liệu"
                      notFoundText="Không tìm thấy nguyên liệu"
                      width="100%"
                    />

                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => {
                        remove(index);
                        setSelectedRestrictIngredients(
                          selectedRestrictIngredients.filter((item) => item !== field.value),
                        );
                      }}
                    >
                      <RxCross2 size={18} className="text-muted-foreground" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {fields.length === districts.length ? null : (
            <Button type="button" variant="outline" className="flex gap-2 mt-2" onClick={() => append({ id: "" })}>
              <FaPlus />
              <span>Thêm nguyên liệu</span>
            </Button>
          )}
        </div>

        <Button type="submit">Cập nhật hồ sơ</Button>
      </form>
    </FormShadcn>
  );
};

export default Form;
