import { useRef, useState } from "react";
import { Link } from "react-router-dom";

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
import { ModalFormType } from "~contexts/checkout/checkout.type";
import useCheckout from "~hooks/useCheckout";

import FormItems from "../FormItems";

const Modal = () => {
  const { form, isErrorSubmit, onShippingAddress } = useCheckout();
  const [open, setOpen] = useState(isErrorSubmit);
  const districtLabel = useRef("");

  const onSubmit = (values: ModalFormType) => {
    console.log("CALL API TO UPDATE USER ADDRESS", values);
    onShippingAddress({
      phone: values.phone,
      city: values.city,
      district: districtLabel.current + ", ",
      address: values.address + ", ",
    });
    setOpen(false);
    form.reset();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
          {isErrorSubmit ? (
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
