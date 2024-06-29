import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~components/ui/alert-dialog";
import { Button } from "~components/ui/button";
import { Form } from "~components/ui/form";
import configs from "~configs";
import { setArea } from "~contexts/checkout/checkout.reducer";
import useAuth from "~hooks/useAuth";
import useCheckout from "~hooks/useCheckout";
import { modalSchema } from "~pages/Checkout/data/schema";

import FormItems from "../FormItems";

export type ModalFormType = z.infer<typeof modalSchema>;

const Modal = () => {
  const { user } = useAuth();
  const { form: checkoutForm, checkout, dispatch } = useCheckout();
  const form = useForm<ModalFormType>({
    mode: "onBlur",
    resolver: zodResolver(modalSchema),
    defaultValues: {
      city: "Hồ Chí Minh",
      district: "",
      phone: "",
      specificAddress: "",
    },
  });
  const [open, setOpen] = useState<boolean | undefined>();
  const districtLabel = useRef("");

  const handleOpenChange = (isOpen: boolean) => setOpen(isOpen);

  const onSubmit = (values: ModalFormType) => {
    const area = checkout?.area.find((area) => area.id === values.district);
    dispatch(setArea({ area }));

    checkoutForm.reset({
      ...checkoutForm.getValues(),
      phone: values.phone,
      city: values.city,
      district: districtLabel.current + ", ",
      specificAddress: values.specificAddress + ", ",
    });

    setOpen(false);
    form.reset();
  };

  return (
    <AlertDialog defaultOpen={!user?.phone || !user?.address} open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <button className="flex-shrink-0 text-primary text-base font-medium leading-9">Thay đổi</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Địa chỉ mới</AlertDialogTitle>
          <AlertDialogDescription>Để đặt hàng vui lòng thêm địa chỉ nhận hàng</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form id="address" onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-8">
            <FormItems form={form} districtLabel={districtLabel} />
          </form>
        </Form>
        <AlertDialogFooter>
          {(!user?.phone || !user?.address) &&
          !(
            checkoutForm.getValues("city") &&
            checkoutForm.getValues("district") &&
            checkoutForm.getValues("phone") &&
            checkoutForm.getValues("specificAddress")
          ) ? (
            <Link to={configs.routes.cart}>
              <Button variant={"ghost"}>Trở lại</Button>
            </Link>
          ) : (
            <AlertDialogCancel>Trở lại</AlertDialogCancel>
          )}
          <Button form="address">Hoàn thành</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
