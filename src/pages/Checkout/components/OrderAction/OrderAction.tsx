import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postOrder } from "~apis/order.api";
import { GET_ME_QUERY_KEY } from "~apis/users.api";
import Spinner from "~components/common/Spinner";
import { Button } from "~components/ui/button";
import { Separator } from "~components/ui/separator";
import configs from "~configs";
import useAuth from "~hooks/useAuth";
import useCheckout from "~hooks/useCheckout";
import { cn } from "~lib/utils";
import { PostOrderBody } from "~types/order.type";
import { SYSTEM_MESSAGES } from "~utils/constants";
import { DeliveryMethodEnum } from "~utils/enums";
import isAxiosError from "~utils/isAxiosError";

const OrderAction = memo(() => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { form, area, checkout } = useCheckout();
  const deliveryMethodWatch = form.watch("deliveryMethod");
  const paymentMethodWatch = form.watch("paymentMethod");
  const totalGoods = useMemo(
    () =>
      checkout?.items.reduce(
        (acc, item) => acc + item.price * item.quantity + (item.extraSpice?.price ?? 0) * item.quantity,
        0,
      ) || 0,
    [checkout?.items],
  );
  const deliveryPrice = useMemo(
    () => (deliveryMethodWatch === DeliveryMethodEnum.INSTANT ? area?.instantPrice : area?.standardPrice) || 0,
    [deliveryMethodWatch, area?.instantPrice, area?.standardPrice],
  );
  const { mutate, isPending } = useMutation({
    mutationFn: (body: PostOrderBody) => postOrder(body),
  });

  const handleShowError = () => toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);

  const handleOrder = () => {
    mutate(
      {
        paymentId: form.getValues("paymentMethod"),
        areaId: String(area?.id || user?.areaId),
        address:
          form.getValues("specificAddress") + form.getValues("district") + form.getValues("city") ||
          String(user?.address),
        note: form.getValues("note") || "",
        deliveryMethod: form.getValues("deliveryMethod"),
        phone: form.getValues("phone"),
      },
      {
        onSuccess: () => {
          form.reset();
          if (!user?.phone || !user?.address) queryClient.invalidateQueries({ queryKey: [GET_ME_QUERY_KEY] });
          navigate(`${configs.routes.order}?success=true`);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
          else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  return (
    <div className="mt-9 px-5 pb-5 pt-10 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold leading-9">Phương thức thanh toán</h3>
          {checkout?.payments.map((payment) => (
            <img
              key={payment.id}
              src={payment.icon}
              alt=""
              className={cn("w-28 h-24 p-4 rounded-[6px] border-[1px] border-solid border-[#F4F4F5]", {
                "border-primary": paymentMethodWatch === payment.id,
              })}
              onClick={() => form.setValue("paymentMethod", payment.id)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6 min-w-[450px]">
          <div className="flex items-center justify-between">
            <span className="text-[#71717A] text-base font-normal leading-7">Tổng tiền hàng:</span>
            <span className="text-base font-normal leading-7">
              <sup>₫</sup>
              {totalGoods.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#71717A] text-base font-normal leading-7">Phí vận chuyển:</span>
            <span className="text-base font-normal leading-7">
              <sup>₫</sup>
              {deliveryPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#71717A] text-base font-normal leading-7">
              Tổng thanh toán ({checkout?.items.length || 0} sản phẩm):
            </span>
            <span className="text-primary text-xl font-semibold leading-7">
              <sup>₫</sup>
              {(totalGoods + deliveryPrice).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <Separator className="mt-3" />
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm font-medium leading-6">
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
          <a href="#!" className="text-[#2563EB] underline">
            Điều khoản Prepify
          </a>
        </p>
        <Button
          className="min-w-[180px] h-10"
          onClick={
            (!user?.phone || !user?.address) &&
            !(
              form.getValues("city") &&
              form.getValues("district") &&
              form.getValues("phone") &&
              form.getValues("specificAddress")
            )
              ? handleShowError
              : handleOrder
          }
        >
          {isPending ? <Spinner /> : "Đặt hàng"}
        </Button>
      </div>
    </div>
  );
});

export default OrderAction;
