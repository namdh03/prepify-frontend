import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";

import { useQuery } from "@tanstack/react-query";

import { GET_TABLE_VIEW_ORDER_DETAIL_QUERY_KEY, getModOrderDetails } from "~apis/order.api";
import { Badge } from "~components/ui/badge";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~components/ui/table";
import { cn } from "~lib/utils";
import { ORDER_STATUS_STYLES } from "~pages/OrderList/data/columns";
import { TableOrderType } from "~types/order.type";
import { ORDER_STATUS_TEXT_MAP } from "~utils/constants";

import { DataTableRowActionsProps } from "../DataTableRowActions/DataTableRowActions";

interface ModalProps extends DataTableRowActionsProps<TableOrderType> {
  open: boolean;
  onOpen: (value: boolean) => void;
  onClose: () => void;
}

const Modal = ({ row, open, onOpen, onClose }: ModalProps) => {
  const { data } = useQuery({
    queryKey: [GET_TABLE_VIEW_ORDER_DETAIL_QUERY_KEY, row.original.id],
    queryFn: () => getModOrderDetails(row.original.id),
    select: (data) => data.data.data,
    enabled: Boolean(open && row.original.id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const totalGoods = useMemo(
    () =>
      data?.orderDetails.reduce(
        (acc, item) => acc + item.price * item.quantity + (item.mealKit.extraSpice?.price ?? 0) * item.quantity,
        0,
      ) || 0,
    [data?.orderDetails],
  );

  return (
    data && (
      <Dialog open={open} onOpenChange={onOpen}>
        <DialogContent className="max-w-[calc(100%-48px)] max-h-[calc(100%-48px)] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="mb-3">Thông tin chi tiết đơn hàng</DialogTitle>
            <DialogDescription asChild>
              <section className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-base">
                  Mã đơn hàng: <Badge variant={"outline"}>{data.trackingNumber}</Badge>
                </div>

                <div className="flex items-center gap-2 text-base">
                  Khu vực: <span className="text-foreground">{data.area.name}</span>
                </div>

                <div className="flex items-center gap-2 text-base">
                  Trạng thái:
                  <Badge
                    variant="outline"
                    className={cn("text-sm font-normal leading-5", ORDER_STATUS_STYLES[data.status])}
                  >
                    {ORDER_STATUS_TEXT_MAP[data.status] || "Không xác định"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-base">
                  Ngày đặt hàng: <span className="text-foreground">{data.datetime}</span>
                </div>

                <div className="text-base">
                  Thông tin khách hàng:
                  <ul className="ml-8 list-disc">
                    <li>
                      Tên khách hàng: <span className="text-foreground">{data.customer.user.fullname}</span>
                    </li>
                    <li>
                      Số điện thoại: <span className="text-foreground">{data.phone}</span>
                    </li>
                    <li>
                      Email: <span className="text-foreground">{data.customer.user.email}</span>
                    </li>
                    <li>
                      Địa chỉ: <span className="text-foreground">{data.address}</span>
                    </li>
                    <li>
                      Ghi chú:{" "}
                      <span className="text-foreground">
                        {data.note || <i className="text-muted-foreground">Không có ghi chú</i>}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-base">
                  Tổng số lượng gói nguyên liệu:
                  <span className="text-foreground">{data.orderDetails.length} gói</span>
                </div>

                <div className="flex items-center gap-2 text-base">
                  Tổng tiền hàng:
                  <span className="text-foreground font-medium">
                    <sup>₫</sup>
                    {totalGoods?.toLocaleString() || 0}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-base">
                  Phí vận chuyển:
                  <span className="text-foreground font-medium">
                    <sup>₫</sup>
                    {(data.totalPrice - (totalGoods ?? 0)).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-base">
                  Tổng thanh toán ({data.orderDetails.length} sản phẩm):
                  <span className="text-primary font-medium">
                    <sup>₫</sup>
                    {data.totalPrice.toLocaleString()}
                  </span>
                </div>
              </section>
            </DialogDescription>
          </DialogHeader>
          <Table className="bg-white text-base">
            <TableHeader>
              <TableRow className="text-foreground font-medium leading-5">
                <TableHead>Gói nguyên liệu</TableHead>
                <TableHead>Khẩu phần ăn</TableHead>
                <TableHead>Đơn giá</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Thành tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.orderDetails.map((item) => (
                <Fragment key={item.id}>
                  <TableRow>
                    <TableCell>
                      <h4 className="max-w-80">{item.mealKit.recipe.name}</h4>
                    </TableCell>

                    <TableCell>
                      <span>{item.mealKit.serving} người ăn</span>
                    </TableCell>

                    <TableCell>
                      <span>
                        <sup>₫</sup>
                        {item.price.toLocaleString()}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span>{item.quantity}</span>
                    </TableCell>

                    <TableCell>
                      <span className="text-primary">
                        <sup>₫</sup>
                        {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>

                  {item.has_extra_spice && item.mealKit.extraSpice && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <h5 className="ml-10 max-w-80">{item.mealKit.extraSpice.name}</h5>
                      </TableCell>
                      <TableCell>
                        <span>
                          <sup>₫</sup>
                          {item.mealKit.extraSpice.price.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <span className="text-primary">
                          <sup>₫</sup>
                          {(item.mealKit.extraSpice.price * item.quantity).toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button onClick={onClose}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default Modal;
