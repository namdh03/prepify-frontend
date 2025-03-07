import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoreRowModel, RowData, RowSelectionState, useReactTable } from "@tanstack/react-table";

import { deleteManyCart, GET_CART_LENGTH_QUERY_KEY, GET_CART_QUERY_KEY, getCart } from "~apis/cart.api";
import { postCheckout } from "~apis/checkout.api";
import images from "~assets/imgs";
import AlertDialog from "~components/common/AlertDialog";
import Spinner from "~components/common/Spinner";
import { Button } from "~components/ui/button";
import { Checkbox } from "~components/ui/checkbox";
import { Skeleton } from "~components/ui/skeleton";
import configs from "~configs";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useMutateCart from "~hooks/useMutateCart";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";
import { DeleteCartBody } from "~types/cart.type";
import { LIMIT, SYSTEM_MESSAGES } from "~utils/constants";

import DataTable from "./components/DataTable";
import breadcrumbs from "./data/breadcrumbs";
import { columns } from "./data/columns";
import { cartItem } from "./data/dummy";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateCartItem: (cartItem: TData) => void;
    deleteCartItem: (cartItemId: string) => void;
    deleteManyCartItems: (cartItemIds: string[]) => void;
    deleteCart: () => void;
  }
}

const Cart = () => {
  useDocumentTitle("Prepify | Giỏ hàng");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isFetching } = useQuery({
    queryKey: [GET_CART_QUERY_KEY],
    queryFn: () => getCart(),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });
  // Show skeleton when loading
  const tableData = useMemo(() => (isFetching ? Array(LIMIT).fill(cartItem) : data), [isFetching, data]);
  const tableColumns = useMemo(
    () =>
      isFetching
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-10" />,
          }))
        : columns,
    [isFetching],
  );
  const { updateCartItem, deleteCartItem, deleteManyCartItems, deleteCart } = useMutateCart();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data: tableData || [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    meta: {
      updateCartItem,
      deleteCartItem,
      deleteManyCartItems,
      deleteCart,
    },
  });
  const { mutate: deleteCartMutate } = useMutation({
    mutationFn: (body: DeleteCartBody) => deleteManyCart(body),
  });
  const { mutate: checkoutMutate, isPending: isCheckoutPending } = useMutation({
    mutationFn: (cartIds: string[]) => postCheckout({ cartIds }),
  });
  const filteredSelectedRowModel = table.getFilteredSelectedRowModel().rows;
  const filteredRowModel = table.getFilteredRowModel().rows;
  const totalPrice = filteredSelectedRowModel.reduce(
    (acc, row) =>
      acc +
      row.original.mealKitSelected.price * row.original.quantity +
      (row.original.mealKitSelected.extraSpice?.price ?? 0) * row.original.quantity,
    0,
  );

  const handleToastError = () => toast.error("Vui lòng chọn sản phẩm");

  const handleDeleteManyCartItem = () => {
    const cartIds = filteredSelectedRowModel.map((row) => row.original.id);

    deleteCartMutate(
      { cartIds },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [GET_CART_LENGTH_QUERY_KEY] });
          table.options.meta?.deleteManyCartItems(cartIds);
          table.toggleAllPageRowsSelected(false);
          toast.success(`Đã xoá ${cartIds.length} sản phẩm khỏi giỏ hàng`);
        },
        onError: () => {
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  const handleOrder = () =>
    checkoutMutate(
      filteredSelectedRowModel.map((row) => row.original.id),
      {
        onSuccess: () => navigate(configs.routes.checkout),
        onError: () => toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG),
      },
    );

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

      <section className="pt-24 pb-16 bg-[#F5F5F5]">
        <Container>
          <h2 className="text-[#18181B] text-xl font-bold leading-9">
            <span>Giỏ hàng </span>
            {!isFetching && (
              <span className="text-muted-foreground text-lg font-normal">({filteredRowModel.length} sản phẩm)</span>
            )}
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
                      onAction={handleDeleteManyCartItem}
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
                    {isCheckoutPending ? <Spinner /> : <span>Mua hàng</span>}
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
