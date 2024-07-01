import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";

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
import { TableCategoryType } from "~types/category.type";

import Modal from "../Modal";
import { ModalFormType } from "../Modal/Modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableCategoryType>) {
  const [open, setOpen] = useState({
    alert: false,
    modalCreate: false,
    modalUpdate: false,
  });

  const handleOpenAlert = () => setOpen((prev) => ({ ...prev, alert: true }));

  const handleOpenAlertChange = (value: boolean) => setOpen((prev) => ({ ...prev, alert: value }));

  const handleOpenModalCreate = () => setOpen((prev) => ({ ...prev, modalCreate: true }));

  const handleOpenModalCreateChange = (value: boolean) => setOpen((prev) => ({ ...prev, modalCreate: value }));

  const handleOpenModalUpdate = () => setOpen((prev) => ({ ...prev, modalUpdate: true }));

  const handleOpenModalUpdateChange = (value: boolean) => setOpen((prev) => ({ ...prev, modalUpdate: value }));

  const handleCreateCategory = (values: ModalFormType) => {
    console.log("Create category", values);
    setOpen((prev) => ({ ...prev, modalCreate: false }));
  };

  const handleUpdateCategory = (values: ModalFormType) => {
    console.log("Update category", values);
    setOpen((prev) => ({ ...prev, modalUpdate: false }));
  };

  const handleDeleteCategory = () => {
    console.log("Delete category", row.original.id);
  };

  return (
    <>
      <Modal
        open={open.modalCreate}
        onOpenChange={handleOpenModalCreateChange}
        title="Tạo mới phân loại"
        description="Phân loại giúp bạn phân loại các công thức một cách dễ dàng hơn."
        onSubmit={handleCreateCategory}
        submitText="Tạo mới"
      />

      <Modal
        open={open.modalUpdate}
        onOpenChange={handleOpenModalUpdateChange}
        title="Chỉnh sửa phân loại"
        description="Chỉnh sửa thông tin phân loại của bạn."
        onSubmit={handleUpdateCategory}
        submitText="Cập nhật"
        defaultName={row.original.name}
      />

      <AlertDialog open={open.alert} onOpenChange={handleOpenAlertChange}>
        {row.original.totalRecipes > 0 ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Không thể xóa phân loại</AlertDialogTitle>
              <AlertDialogDescription>
                Phân loại này đang được sử dụng trong{" "}
                <strong className="text-primary">{row.original.totalRecipes} công thức</strong>. Vui lòng xóa các công
                thức trước khi xóa phân loại.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Đóng</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
              <AlertDialogDescription>
                Hành động này không thể hoàn tác. Hành động này sẽ xóa vĩnh viễn{" "}
                <strong className="text-primary">phân loại</strong> của bạn và xóa dữ liệu của bạn khỏi máy chủ.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteCategory}>Tiếp tục</AlertDialogCancel>
              <AlertDialogAction>Hủy</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem className="cursor-pointer" onClick={handleOpenModalCreate}>
            <DropdownMenuShortcut className="ml-0 mr-2">
              <GoPlusCircle size={16} />
            </DropdownMenuShortcut>
            Tạo mới
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={handleOpenModalUpdate}>
            <DropdownMenuShortcut className="ml-0 mr-2">
              <FiEdit3 size={16} />
            </DropdownMenuShortcut>
            Chỉnh Sửa
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={handleOpenAlert}>
            <DropdownMenuShortcut className="ml-0 mr-2">
              <RiDeleteBinLine size={16} />
            </DropdownMenuShortcut>
            Xoá Phân Loại
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
