import { useState } from "react";
import dayjs from "dayjs";
import { BsTruck } from "react-icons/bs";
import { SiAdguard } from "react-icons/si";
import { Link } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~components/ui/alert-dialog";
import { Button } from "~components/ui/button";
import { Separator } from "~components/ui/separator";
import configs from "~configs";
import { OrderItem as OrderItemType } from "~types/order.type";
import { OrderStatus } from "~utils/enums";

import Feedback from "../Feedback";
import OrderItem from "../OrderItem";

import "dayjs/locale/vi";

dayjs.locale("vi");

interface OrderProps {
  id: string;
  orderItems: OrderItemType[];
  status: string;
  orderDate: string;
  totalPrice: number;
  hasFeedback: boolean;
}

const Order = ({ id, orderItems, status, orderDate, totalPrice, hasFeedback }: OrderProps) => {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const handleOpenFeedbackModal = () => setOpenFeedbackModal(true);
  const handleCloseFeedbackModal = () => setOpenFeedbackModal(false);

  return (
    <article className="my-3 p-6 bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-medium">Đơn đặt hàng:</span> {dayjs(orderDate).format("DD/MM/YYYY")}
        </p>
        {status === OrderStatus.WAITING && <span className="text-primary">CHỜ XÁC NHẬN</span>}
        {status === OrderStatus.CREATED && <span className="text-primary">ĐÃ XÁC NHẬN</span>}
        {status === OrderStatus.PICKED_UP && <span className="text-primary">ĐÃ NHẬN ĐƠN</span>}
        {(status === OrderStatus.DELIVERING || status === OrderStatus.DELAYED) && (
          <span className="text-primary">ĐANG GIAO HÀNG</span>
        )}
        {status === OrderStatus.DELIVERED && (
          <div className="flex items-center gap-3 h-6">
            <BsTruck color="#26aa99" />
            <span className="text-[#26aa99]">Giao hàng thành công</span>
            <Separator orientation="vertical" />
            <span className="text-primary">HOÀN THÀNH</span>
          </div>
        )}
        {status === OrderStatus.CANCELED && <span className="text-destructive">ĐÃ HỦY</span>}
      </div>

      <Separator className="my-3" />

      <div className="pb-[2px]">
        {orderItems.map((orderItem) => (
          <Link key={orderItem.id} to={`${configs.routes.userPurchase}/${id}`}>
            <OrderItem {...orderItem} />
          </Link>
        ))}
      </div>

      <Separator className="my-3" />

      <div className="flex flex-col items-end gap-6 px-6 pt-6">
        <div className="flex items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <SiAdguard size={16} className="text-primary" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <div className="flex items-center gap-[6px]">
                    <SiAdguard size={16} className="text-primary" />
                    <span className="text-primary text-lg font-normal">PREPIFY ĐẢM BẢO</span>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Prepify đảm bảo hàng hóa của bạn được giao đến đúng hẹn và chất lượng như bạn mong muốn.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>ĐÃ HIỂU</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <span className="ml-1 text-base">Thành tiền: </span>
          <span className="block ml-[10px] text-center text-primary text-2xl font-normal leading-5">
            <sup>₫</sup>
            {totalPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-[10px]">
          {(status === OrderStatus.DELIVERED || status === OrderStatus.CANCELED) && (
            <Button size={"lg"} className="min-w-[150px]">
              Mua lại
            </Button>
          )}

          {status === OrderStatus.DELIVERED && !hasFeedback && (
            <Feedback
              trigger={
                <Button variant={"outline"} size={"lg"} className="min-w-[150px]" onClick={handleOpenFeedbackModal}>
                  Đánh giá
                </Button>
              }
              orderItems={orderItems}
              open={openFeedbackModal}
              onClose={handleCloseFeedbackModal}
            />
          )}

          {status === OrderStatus.WAITING && (
            <Button variant={"default"} size={"lg"} className="min-w-[150px]">
              Thanh toán
            </Button>
          )}

          {(status === OrderStatus.WAITING || status === OrderStatus.CREATED) && (
            <Button variant={"outline"} size={"lg"} className="min-w-[150px]">
              Hủy đơn hàng
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Order;
