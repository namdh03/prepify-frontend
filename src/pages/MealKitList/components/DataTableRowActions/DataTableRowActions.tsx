import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoEyeOutline, IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableMealKitType>) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);

  const handleOpenDialogChange = (value: boolean) => setOpen(value);

  const handleChangeStatusMealKit = () => {
    console.log("Change status", row.original.id, !row.original.status);
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
