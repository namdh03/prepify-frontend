import { memo, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";

import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation } from "@tanstack/react-query";
import { Row, Table } from "@tanstack/react-table";

import { updateCart } from "~apis/cart.api";
import AlertDialog from "~components/common/AlertDialog";
import { Checkbox } from "~components/ui/checkbox";
import { Separator } from "~components/ui/separator";
import { TableCell, TableRow } from "~components/ui/table";
import { CartItem, ExtraSpice, UpdateCartBody } from "~types/cart.type";
import { SYSTEM_MESSAGES } from "~utils/constants";

interface AddMoreProps<TData> {
  table: Table<TData>;
  row: Row<CartItem>;
  cartItem: CartItem;
  spice: ExtraSpice | null;
}

const AddMore = memo(({ table, row, cartItem, spice }: AddMoreProps<CartItem>) => {
  const [checked, setChecked] = useState<CheckedState>(false);
  const { mutate } = useMutation({
    mutationFn: (body: UpdateCartBody) => updateCart(body),
  });

  const handleCheckChange = (value: CheckedState) => setChecked(value);

  const handleAddSpice = () => {
    mutate(
      {
        cartId: cartItem.id,
        has_extra_spice: true,
        mealkitId: cartItem.mealKitSelected.id,
        quantity: cartItem.quantity,
      },
      {
        onSuccess: () => {
          row.toggleSelected(true);
          table.options.meta?.updateCartItem?.({
            ...cartItem,
            mealKitSelected: {
              ...cartItem.mealKitSelected,
              extraSpice: spice,
            },
          });
        },
        onError: () => {
          table.options.meta?.updateCartItem({
            ...row.original,
          });
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  return (
    <TableRow className="bg-[#FFEDD5] text-center [&>*]:px-[10px] [&>*]:py-2 hover:bg-[#FFEDD5] border-b-transparent">
      <TableCell colSpan={6} className="text-left">
        <div className="flex items-center gap-2 leading-5">
          <span className="px-[6px] text-red-500 text-[10px] font-medium rounded border-[1px] border-red-500">
            Mua thêm
          </span>

          <p className="text-[#09090B] text-xs font-normal">Tiết kiệm hơn khi mua kèm gói gia vị hoàn chỉnh</p>

          <AlertDialog
            trigger={
              <button className="flex items-center text-primary">
                <span className="text-xs font-semibold leading-6">Thêm</span>
                <IoIosArrowForward />
              </button>
            }
            title="Thêm gói vị hoàn chỉnh"
            description={
              <div className="mt-1">
                <span>Vui lòng chọn gói gia vị</span>
                <article className="my-8 text-[#09090B] text-sm">
                  <div className="flex items-center mb-3">
                    <Checkbox id="spice" checked={checked} onCheckedChange={(value) => handleCheckChange(value)} />
                    <label htmlFor="spice" className="flex-1">
                      <div className="flex items-center ml-5">
                        <img src={spice?.image} alt="" className="w-12 h-12 rounded object-contain" />
                        <h6 className="w-40 ml-2 font-normal leading-5 line-clamp-3 break-keep">{spice?.name}</h6>
                        <div className="flex items-center gap-14 ml-auto">
                          <span>1</span>
                          <span className="block text-center text-primary font-normal leading-5">
                            <sup>₫</sup>
                            {spice?.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>

                  <Separator />
                </article>
              </div>
            }
            cancelText="Trở lại"
            actionText="Hoàn thành"
            onAction={checked ? handleAddSpice : undefined}
          />
        </div>
      </TableCell>
    </TableRow>
  );
});

export default AddMore;
