import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

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
import modalSchema from "~pages/CategoryList/data/schema";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  defaultName?: string;
  title: string;
  description?: string;
  onSubmit: (values: ModalFormType) => Promise<void>;
  submitText: string;
}

export type ModalFormType = z.infer<typeof modalSchema>;

export default function Modal({
  open,
  onOpenChange,
  defaultName = "",
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
    },
  });

  const handleSubmit = async (values: ModalFormType) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8" id="category-modal-form">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên phân loại</FormLabel>
                  <FormControl>
                    <Input placeholder="Vui lòng điền tên phân loại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="category-modal-form">
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
