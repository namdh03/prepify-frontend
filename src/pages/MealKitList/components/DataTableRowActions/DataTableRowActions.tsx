import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoEyeOutline, IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";

import { GET_TABLE_MEAL_KITS_QUERY_KEY, toggleStatusMealKit } from "~apis/meal-kit.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~components/ui/dropdown-menu";
import Button from "~layouts/AdminLayout/components/Button";
import { TableMealKitType } from "~types/meal-kit.type";
import { MEAL_KIT_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableMealKitType>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutate } = useMutation({
    mutationFn: () => toggleStatusMealKit(row.original.id),
  });

  const handleOpenDialog = () => setOpen(true);

  const handleOpenDialogChange = (value: boolean) => setOpen(value);

  const handleChangeStatusMealKit = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_TABLE_MEAL_KITS_QUERY_KEY] });
        toast.success(
          row.original.status
            ? MEAL_KIT_MESSAGES.TOGGLE_STATUS_MEAL_KIT_SUCCESS_SUSPEND
            : MEAL_KIT_MESSAGES.TOGGLE_STATUS_MEAL_KIT_SUCCESS_RESUME,
        );
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
        else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
      },
    });
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={handleOpenDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ thay đổi <span className="text-secondary">trạng thái kinh doanh</span> của gói nguyên
              liệu từ
              <strong className="text-primary"> {row.original.status ? "đang mở bán" : "tạm ngừng"}</strong> sang
              <strong className="text-primary"> {row.original.status ? "tạm ngừng" : "đang mở bán"}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleChangeStatusMealKit}>Tiếp tục</AlertDialogCancel>
            <AlertDialogAction>Hủy</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem className="cursor-pointer">
            <DropdownMenuShortcut className="ml-0 mr-2">
              <IoEyeOutline size={16} />
            </DropdownMenuShortcut>
            Xem Chi Tiết
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <DropdownMenuShortcut className="ml-0 mr-2">
              <FiEdit3 size={16} />
            </DropdownMenuShortcut>
            Chỉnh Sửa
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {row.original.status ? (
            <DropdownMenuItem className="cursor-pointer" onClick={handleOpenDialog}>
              <DropdownMenuShortcut className="ml-0 mr-2">
                <IoLockClosedOutline size={16} />
              </DropdownMenuShortcut>
              Ngừng Kinh Doanh
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="cursor-pointer" onClick={handleOpenDialog}>
              <DropdownMenuShortcut className="ml-0 mr-2">
                <IoLockOpenOutline size={16} />
              </DropdownMenuShortcut>
              Tiếp Tục Kinh Doanh
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
