import { useMemo } from "react";
import dayjs from "dayjs";
import { HandCoins, Package, Star, Truck } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { BsTruck } from "react-icons/bs";
import { SiAdguard } from "react-icons/si";
import { Link, useOutletContext } from "react-router-dom";

import icons from "~assets/icons";
import { Step, StepItem, Stepper } from "~components/common/Stepper";
import { Badge } from "~components/ui/badge";
import { Button } from "~components/ui/button";
import { Separator } from "~components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";
import configs from "~configs";
import Spice from "~pages/Checkout/components/Spice";
import { OrderDetailType } from "~types/order.type";
import { OrderStatus } from "~utils/enums";

export default function UserPurchaseDetail() {
  const { totalPrice, orderDate, status, trackingNumber, orderItems, deliveryPrice, payment } =
    useOutletContext<OrderDetailType>();
  const totalGoods = useMemo(
    () =>
      orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity + (item.extraSpice?.price ?? 0) * item.quantity,
        0,
      ) || 0,
    [orderItems],
  );
  const steps = useMemo(
    () =>
      [
        {
          label: `Đơn Hàng Đã Thanh Toán (đ${totalPrice.toLocaleString()})`,
          icon: HandCoins,
          description: dayjs(orderDate).format("HH:mm DD-MM-YYYY"),
        },
        { label: "Đã Giao Cho NVC", icon: Truck },
        { label: "Chờ Giao Hàng", icon: Package },
        { label: "Đánh Giá", icon: Star },
      ] satisfies StepItem[],
    [orderDate, totalPrice],
  );

  const initialStep = useMemo(() => {
    switch (status) {
      case OrderStatus.CREATED:
        return 1;
      case OrderStatus.PICKED_UP:
        return 2;
      case OrderStatus.DELIVERING:
        return 3;
      case OrderStatus.DELIVERED:
        return 4;
      default:
        return 0;
    }
  }, [status]);

  return (
    <section>
      <h2 className="text-2xl font-semibold">Chi Tiết Đơn Hàng</h2>
      <div className="flex justify-between mt-5">
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-foreground text-sm">MÃ ĐƠN HÀNG: </span>
            <Badge variant={"outline"} className="py-1">
              {trackingNumber}
            </Badge>
          </div>

          <div>
            <span className="text-foreground text-sm">NGÀY ĐẶT HÀNG: </span>
            <span>{dayjs(orderDate).format("DD/MM/YYYY")}</span>
          </div>
        </div>

        <div>
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
      </div>

      {initialStep !== 0 && (
        <>
          <Separator className="my-8" />

          <div className="flex w-full flex-col gap-4">
            <Stepper initialStep={initialStep} steps={steps} variant="circle-alt">
              {steps.map((props) => {
                return <Step key={props.label} {...props} />;
              })}
            </Stepper>
          </div>
        </>
      )}

      <Separator className="my-8" />

      <Table className="bg-white text-[#09090B]">
        <TableHeader>
          <TableRow>
            <TableHead className="p-4 text-[#09090B] text-base font-medium leading-5">Gói nguyên liệu</TableHead>
            <TableHead className="p-4 text-[#09090B] text-center text-base font-medium leading-5">Đơn giá</TableHead>
            <TableHead className="p-4 text-[#09090B] text-center text-base font-medium leading-5">Số lượng</TableHead>
            <TableHead className="p-4 text-[#09090B] text-center text-base font-medium leading-5">Thành tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((item) => (
            <Fragment key={item.id}>
              <TableRow>
                <TableCell className="px-4 py-5">
                  <div className="flex items-center">
                    <Link to={`${configs.routes.shop}/${item.slug}`} className="flex items-center">
                      <img src={item.image} alt="" className="w-20 h-20 rounded-[5px] object-contain" />
                      <h4 className="w-44 ml-3 text-base font-normal leading-5 line-clamp-3 break-keep">{item.name}</h4>
                    </Link>

                    <span className="ml-auto mr-auto text-[#A1A1AA] text-sm font-normal leading-5">
                      {item.serving} người ăn
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="block text-center text-sm font-normal leading-5">
                    <sup>₫</sup>
                    {item.price.toLocaleString()}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="block text-center text-sm font-normal leading-5">{item.quantity}</span>
                </TableCell>

                <TableCell>
                  <span className="block text-center text-primary text-sm font-normal leading-5">
                    <sup>₫</sup>
                    {(item.price * item.quantity).toLocaleString()}
                  </span>
                </TableCell>
              </TableRow>

              {item.extraSpice && <Spice spice={item.extraSpice} quantity={item.quantity} />}
            </Fragment>
          ))}
        </TableBody>
      </Table>

      <Separator className="my-8" />

      <div className="mt-10 px-10 py-5 rounded-[5px] bg-white border-t-primary border-t-[5px]">
        <div className="flex items-center">
          <img src={icons.maps} alt="" />
          <h3 className="ml-3 text-primary text-2xl font-medium left-9">Địa chỉ nhận hàng</h3>
        </div>

        <div className="flex items-center gap-20 justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-9">Dương Hoàng Nam</span>
            <span className="text-base font-semibold leading-9">0916207758</span>
          </div>

          <p className="text-base font-normal leading-9">
            123 Phan Văn Trị, Phường 10, Quận Gò Vấp, Thành phố Hồ Chí Minh
          </p>
        </div>
      </div>

      {(initialStep !== 0 || status === OrderStatus.WAITING) && (
        <>
          <Separator className="my-8" />

          <div className="bg-white">
            <div className="flex items-center justify-between">
              {status !== OrderStatus.WAITING && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold leading-9">Phương thức thanh toán</h3>
                  <img
                    key={payment.id}
                    src={payment.icon}
                    alt=""
                    className="w-28 h-24 p-4 rounded-[6px] border-[1px] border-solid border-[#F4F4F5] border-primary"
                  />
                </div>
              )}

              <div className="ml-auto flex flex-col gap-6 min-w-[450px]">
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
                    Tổng thanh toán ({orderItems.length || 0} sản phẩm):
                  </span>
                  <span className="text-primary text-xl font-semibold leading-7">
                    <sup>₫</sup>
                    {totalPrice.toLocaleString()}
                  </span>
                </div>

                {status !== OrderStatus.WAITING && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#71717A] text-base font-normal leading-7">
                      <SiAdguard size={16} className="text-primary" />
                      Phương thức thanh toán:
                    </div>
                    <span className="text-base font-normal leading-7">{payment.name}</span>
                  </div>
                )}

                {status === OrderStatus.WAITING && <Button>THANH TOÁN</Button>}
              </div>
            </div>
          </div>
        </>
      )}

      <Separator className="my-8" />
    </section>
  );
}
