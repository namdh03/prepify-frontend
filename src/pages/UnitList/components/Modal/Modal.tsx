import { useForm, UseFormReset } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import MultipleSelector from "~components/common/MultipleSelector";
import { Option } from "~components/common/MultipleSelector/MultipleSelector";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import modalSchema from "~pages/UnitList/data/schema";
import { UnitEnum, UnitText } from "~utils/enums";

export type ModalFormType = z.infer<typeof modalSchema>;

interface TypeOption {
  label: UnitText;
  value: UnitEnum;
  disable?: boolean;
}

interface ModalProps {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  defaultName?: string;
  defaultOptionType?: TypeOption[];
  title: string;
  description?: string;
  onSubmit: (values: ModalFormType, reset: UseFormReset<ModalFormType>) => Promise<void>;
  submitText: string;
}

const DEFAULT_TYPE_OPTIONS: Option[] = [
  {
    label: UnitText.INGREDIENT,
    value: UnitEnum.INGREDIENT,
    disable: false,
  },
  {
    label: UnitText.NUTRITION,
    value: UnitEnum.NUTRITION,
    disable: false,
  },
];

export default function Modal({
  open,
  onOpenChange,
  defaultName = "",
  defaultOptionType,
  title,
  description,
  onSubmit,
  submitText,
}: ModalProps) {
  const form = useForm<ModalFormType>({
    mode: "onChange",
    resolver: zodResolver(modalSchema),
    defaultValues: {
      name: defaultName,
      type: defaultOptionType,
    },
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
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" id="unit-modal-form">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phân loại</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={DEFAULT_TYPE_OPTIONS}
                      placeholder="Vui lòng chọn phân loại đơn vị"
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
                  <FormLabel>Tên đơn vị</FormLabel>
                  <FormControl>
                    <Input placeholder="Vui lòng điền tên đơn vị" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="unit-modal-form">
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
