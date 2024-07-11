import { useForm, UseFormReset } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import modalSchema from "~pages/ModSettings/data/schema";
import { SETTING_VALUE_TEXT_MAP } from "~utils/constants";
import { ConfigEnum } from "~utils/enums";

export type ModalFormType = z.infer<typeof modalSchema>;

interface ModalProps {
  type: ConfigEnum;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  defaultValue?: number;
  title: string;
  description?: string;
  onSubmit: (values: ModalFormType, reset: UseFormReset<ModalFormType>) => Promise<void>;
  submitText: string;
  loading?: boolean;
}

export default function Modal({
  type,
  open,
  onOpenChange,
  defaultValue = 0,
  title,
  description,
  onSubmit,
  submitText,
  loading,
}: ModalProps) {
  const form = useForm<ModalFormType>({
    mode: "onChange",
    resolver: zodResolver(modalSchema),
    values: {
      value: defaultValue,
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá trị ({SETTING_VALUE_TEXT_MAP[type]})</FormLabel>
                  <FormControl>
                    <Input placeholder="Vui lòng điền giá trị" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="unit-modal-form" className="min-w-24">
            {loading ? <Spinner /> : submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
