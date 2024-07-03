import { useForm, UseFormReset } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { GET_FOOD_STYLES_QUERY_KEY, GET_FOOD_STYLES_STALE_TIME, getFoodStyles } from "~apis/food-style.api";
import MultipleSelector from "~components/common/MultipleSelector";
import { Option } from "~components/common/MultipleSelector/MultipleSelector";
import Spinner from "~components/common/Spinner";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import modalSchema from "~pages/FoodStyleList/data/schema";

export type ModalFormType = z.infer<typeof modalSchema>;

type DefaultValueTypes = {
  title: Option[];
  name: string;
};

interface ModalProps {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  defaultValues?: DefaultValueTypes;
  title: string;
  description?: string;
  onSubmit: (values: ModalFormType, reset: UseFormReset<ModalFormType>) => Promise<void>;
  submitText: string;
  loading?: boolean;
}

export default function Modal({
  open,
  onOpenChange,
  defaultValues = { title: [], name: "" },
  title,
  description,
  onSubmit,
  submitText,
  loading,
}: ModalProps) {
  const form = useForm<ModalFormType>({
    mode: "onChange",
    resolver: zodResolver(modalSchema),
    values: defaultValues,
  });
  const { data } = useQuery({
    queryKey: [GET_FOOD_STYLES_QUERY_KEY],
    queryFn: () => getFoodStyles(),
    refetchOnWindowFocus: false,
    staleTime: GET_FOOD_STYLES_STALE_TIME,
    select: (data) => data.data.data,
  });

  const handleSubmit = async (values: ModalFormType) => await onSubmit(values, form.reset);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" id="food-style-modal-form">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormDescription className="text-primary">
                    Chỉ chọn một tiêu đề, nếu không có tiêu đề phù hợp, vui lòng tạo mới.
                  </FormDescription>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      creatable
                      options={data?.map((item) => ({ value: item.type, label: item.title })) ?? []}
                      maxSelected={1}
                      placeholder="Vui lòng chọn tiêu đề"
                      emptyIndicator={
                        <p className="text-center text-base leading-10 text-gray-600 dark:text-gray-400">
                          Không tìm thấy kết quả nào.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên phong cách</FormLabel>
                  <FormControl>
                    <Input placeholder="Vui lòng điền tên phong cách" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="food-style-modal-form" className="min-w-24">
            {loading ? <Spinner /> : submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
