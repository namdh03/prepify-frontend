import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { GET_AREAS_QUERY_KEY, GET_AREAS_STALE_TIME, getAreas } from "~apis/area.api";
import { GET_INGREDIENTS_QUERY_KEY, GET_TABLE_INGREDIENTS_STALE_TIME, getIngredients } from "~apis/ingredient.api";
import { GET_ME_QUERY_KEY, updateMe } from "~apis/user.api";
import Combobox from "~components/common/Combobox/Combobox";
import Spinner from "~components/common/Spinner";
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
import useAuth from "~hooks/useAuth";
import { userProfileSchema } from "~pages/UserProfile/data/schema";
import { UpdateMeBody } from "~types/user.type";
import { SYSTEM_MESSAGES, USER_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

type UserProfileFormType = z.infer<typeof userProfileSchema>;

const Form = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const restrictIngredients = useMemo(() => user?.customer.restrictIngredients, [user]);
  const form = useForm<UserProfileFormType>({
    mode: "onBlur",
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      city: "Hồ Chí Minh",
      areaId: user?.areaId || "",
      address: user?.address || "",
      restrictIngredients: restrictIngredients?.map((item) => ({ id: item.ingredient.id })) || [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "restrictIngredients",
    control: form.control,
  });
  const [restrictIngredientIds, setRestrictIngredientIds] = useState<string[]>([]);
  const [selectedRestrictIngredients, setSelectedRestrictIngredients] = useState<string[]>([]);
  const [createRestrictIngredientIds, setCreateRestrictIngredientIds] = useState<string[]>([]);
  const [removeRestrictIngredientIds, setRemoveRestrictIngredientIds] = useState<string[]>([]);
  const { data: areas } = useQuery({
    queryKey: [GET_AREAS_QUERY_KEY],
    queryFn: () => getAreas(),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
    staleTime: GET_AREAS_STALE_TIME,
  });
  const { data: ingredients } = useQuery({
    queryKey: [GET_INGREDIENTS_QUERY_KEY],
    queryFn: () => getIngredients(),
    select: (data) => data.data.data,
    staleTime: GET_TABLE_INGREDIENTS_STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const { mutate: updateMeMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: (body: UpdateMeBody) => updateMe(body),
  });

  // Set default selected value for restrictIngredients
  useEffect(() => {
    setSelectedRestrictIngredients(restrictIngredients?.map((item) => item.ingredient.id) || []);
    setRestrictIngredientIds((prev) => [...prev, ...(restrictIngredients?.map((item) => item.ingredient.id) || [])]);
    form.setValue("restrictIngredients", restrictIngredients?.map((item) => ({ id: item.ingredient.id })) || []);
  }, [form, restrictIngredients]);

  useEffect(() => {
    if (selectedRestrictIngredients.length === 0) {
      setCreateRestrictIngredientIds([]);
      setRemoveRestrictIngredientIds(restrictIngredients?.map((item) => item.ingredient.id) || []);
    } else {
      setCreateRestrictIngredientIds(
        selectedRestrictIngredients.filter(
          (item) => !restrictIngredients?.map((item) => item.ingredient.id).includes(item),
        ),
      );
      setRemoveRestrictIngredientIds(
        (restrictIngredients || [])
          ?.map((item) => item.ingredient.id)
          .filter((item) => !selectedRestrictIngredients.includes(item)),
      );
    }
  }, [restrictIngredients, selectedRestrictIngredients]);

  const onSubmit = (values: UserProfileFormType) => {
    if (!user) return;
    updateMeMutate(
      {
        address: values.address,
        areaId: values.areaId,
        email: values.email || user.email,
        fullname: values.fullname,
        phone: values.phone,
        createIngredientIds: createRestrictIngredientIds,
        removeIngredientIds: removeRestrictIngredientIds,
      },
      {
        onSuccess: () => {
          setCreateRestrictIngredientIds([]);
          setRemoveRestrictIngredientIds([]);
          queryClient.invalidateQueries({ queryKey: [GET_ME_QUERY_KEY] });
          toast.success(USER_MESSAGES.UPDATE_PROFILE_SUCCESS);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
          else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
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

        {user?.hasPassword && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} disabled />
                </FormControl>
                <FormDescription>
                  Bạn có thể quản lý các địa chỉ email đã xác minh trong cài đặt email của mình
                </FormDescription>
                <FormDescription className="text-primary">Lưu ý: Hiện tại không hỗ trợ thay đổi email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
            name="areaId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Quận, Huyện</FormLabel>
                <Combobox
                  options={areas?.map((area) => ({ value: area.id, label: area.name })) ?? []}
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value as string}
                  placeholder="Chọn quận, huyện"
                  notFoundText="Không tìm thấy quận, huyện"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
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
            Danh sách các nguyên liệu bạn có thể bị dị ứng. Bạn sẽ được cảnh báo khi chọn các công thức có chứa các
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
                      options={
                        ingredients?.map((ingredient) => ({ value: ingredient.id, label: ingredient.name })) ?? []
                      }
                      selectedOption={restrictIngredientIds}
                      onValueChange={(value) => {
                        field.onChange(value);

                        setSelectedRestrictIngredients((prev) => [
                          ...prev.filter((item) => item !== field.value),
                          value,
                        ]);

                        // Swap value in selectedRestrictIngredients and remove previous value
                        setRestrictIngredientIds((prev) => [...prev.filter((item) => item !== field.value), value]);
                      }}
                      value={field.value as string}
                      placeholder="Chọn nguyên liệu"
                      notFoundText="Không tìm thấy nguyên liệu"
                    />

                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => {
                        remove(index);
                        setSelectedRestrictIngredients(
                          selectedRestrictIngredients.filter((item) => item !== field.value),
                        );
                        setRestrictIngredientIds(restrictIngredientIds.filter((item) => item !== field.value));
                        setRemoveRestrictIngredientIds((prev) => [...prev, field.value as string]);
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

          {fields.length === ingredients?.length ? null : (
            <Button type="button" variant="outline" className="flex gap-2 mt-2" onClick={() => append({ id: "" })}>
              <FaPlus />
              <span>Thêm nguyên liệu</span>
            </Button>
          )}
        </div>

        <Button type="submit" className="min-w-36">
          {isUpdatePending ? <Spinner /> : "Cập nhật hồ sơ"}
        </Button>
      </form>
    </FormShadcn>
  );
};

export default Form;
