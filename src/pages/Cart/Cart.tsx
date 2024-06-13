import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, RowData, RowSelectionState, useReactTable } from "@tanstack/react-table";

import { CART_STALE_TIME, GET_CART_QUERY_KEY, getCart } from "~apis/cart.api";
import images from "~assets/imgs";
import AlertDialog from "~components/common/AlertDialog";
import { Button } from "~components/ui/button";
import { Checkbox } from "~components/ui/checkbox";
import configs from "~configs";
import useMutateCart from "~hooks/useMutateCart";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";

import DataTable from "./components/DataTable";
import breadcrumbs from "./data/breadcrumbs";
import { columns } from "./data/columns";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    mutateCart: (cartItem: TData) => void;
  }
}

const Cart = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: [GET_CART_QUERY_KEY],
    queryFn: () => getCart(),
    select: (data) => data.data.data,
    staleTime: CART_STALE_TIME,
  });
  const { mutateCart } = useMutateCart();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    meta: {
      mutateCart,
    },
  });
  const filteredSelectedRowModel = table.getFilteredSelectedRowModel().rows;
  const filteredRowModel = table.getFilteredRowModel().rows;
  const totalPrice = filteredSelectedRowModel.reduce(
    (acc, row) =>
      acc +
      row.original.quantity * row.original.mealKitSelected.price +
      (row.original.mealKitSelected.extraSpice?.price || 0),
    0,
  );

  const handleToastError = () => toast.error("Vui lòng chọn sản phẩm");

  const handleDelete = () => {
    console.log(
      "CALL API TO DELETE ALL SELECTED ITEMS",
      filteredSelectedRowModel.map((row) => row.original.id),
    );
  };

  const handleOrder = () => {
    console.log("CALL API TO ORDER ALL SELECTED ITEMS");
    navigate(configs.routes.checkout, {
      state: filteredSelectedRowModel.map((row) => row.original.id),
    });
  };

  return (
    <>
      <Banner
        text={
          <h1 className="max-w-[483px] mb-32 text-[54px] font-bold leading-[70px] text-[rgba(0,_0,_0,_0.85)]">
            <span className="text-primary">Prepify</span>
            <span className="text-secondary"> | </span>
            <span>Giỏ hàng của bạn</span>
          </h1>
        }
        image={images.cartBanner}
        breadcrumbs={breadcrumbs}
        className="[&_img]:w-[1000px] pb-9"
      />

      <section className="pt-9 pb-16 bg-[#F5F5F5]">
        <Container>
          <h2 className="text-[#18181B] text-xl font-bold leading-9">
            <span>Giỏ hàng </span>
            <span className="text-muted-foreground text-lg font-normal">({filteredRowModel.length} sản phẩm)</span>
          </h2>

          <div className="mt-9">
            <div className="mb-7">
              <DataTable table={table} length={columns.length} />
            </div>

            {data && data.length > 0 && (
              <div className="sticky bottom-0 flex justify-between py-[30px] px-[18px] bg-white [box-shadow:0px_-2px_14px_0px_rgba(0,_0,_0,_0.10)]">
                <div className="flex items-center gap-8 text-base font-normal leading-5">
                  <Checkbox
                    id="check-all"
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                  />

                  <label htmlFor="check-all" className="cursor-pointer">
                    Chọn tất cả ({filteredRowModel.length})
                  </label>

                  {filteredSelectedRowModel.length ? (
                    <AlertDialog
                      trigger={<span className="cursor-pointer">Xoá</span>}
                      title={`Bạn có muốn bỏ ${filteredSelectedRowModel.length} sản phẩm?`}
                      cancelText="TRỞ LẠI"
                      actionText="CÓ"
                      onAction={handleDelete}
                      reverse
                      className="[&_h2]:font-normal"
                    />
                  ) : (
                    <span className="cursor-pointer" onClick={handleToastError}>
                      Xoá
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xl font-medium leading-7">
                  <h4 className="">Tổng thanh toán ({filteredSelectedRowModel.length} sản phẩm):</h4>
                  <span className="ml-9 text-primary">
                    <sup>₫</sup>
                    {totalPrice.toLocaleString()}
                  </span>
                  <Button
                    className="ml-[52px] min-w-[180px]"
                    onClick={filteredSelectedRowModel.length ? handleOrder : handleToastError}
                  >
                    Mua hàng
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Cart;
