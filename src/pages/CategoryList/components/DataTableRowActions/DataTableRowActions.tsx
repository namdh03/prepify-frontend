import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";

import {
  deleteCategory,
  GET_CATEGORIES_QUERY_KEY,
  GET_TABLE_CATEGORIES_QUERY_KEY,
  updateCategory,
} from "~apis/category.api";
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
import { TableCategoryType, UpdateCategoryBody } from "~types/category.type";
import { CATEGORY_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

import Modal from "../Modal";
import { ModalFormType } from "../Modal/Modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableCategoryType>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState({
    alert: false,
    modal: false,
  });
  const { mutateAsync: updateCategoryMutateAsync } = useMutation({
    mutationFn: (body: UpdateCategoryBody) => updateCategory(row.original.id, body),
  });
  const { mutate: deleteCategoryMutate } = useMutation({
    mutationFn: () => deleteCategory(row.original.id),
  });

  const handleOpenAlert = () => setOpen((prev) => ({ ...prev, alert: true }));

  const handleOpenAlertChange = (value: boolean) => setOpen((prev) => ({ ...prev, alert: value }));

  const handleOpenModal = () => setOpen((prev) => ({ ...prev, modal: true }));

  const handleOpenModalChange = (value: boolean) => setOpen((prev) => ({ ...prev, modal: value }));

  const handleUpdateCategory = async (values: ModalFormType, reset: UseFormReset<ModalFormType>) => {
    await updateCategoryMutateAsync(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
        queryClient.invalidateQueries({ queryKey: [GET_TABLE_CATEGORIES_QUERY_KEY] });
        reset({ name: values.name });
        setOpen((prev) => ({ ...prev, modal: false }));
        toast.success(CATEGORY_MESSAGES.UPDATE_CATEGORY_SUCCESS);
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
        else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
      },
    });
  };

  const handleDeleteCategory = () => {
    deleteCategoryMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
        queryClient.invalidateQueries({ queryKey: [GET_TABLE_CATEGORIES_QUERY_KEY] });
        setOpen((prev) => ({ ...prev, alert: false }));
        toast.success(CATEGORY_MESSAGES.DELETE_CATEGORY_SUCCESS);
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
        else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
      },
    });
  };

  return (
    <>
      <Modal
        open={open.modal}
        onOpenChange={handleOpenModalChange}
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
          <DropdownMenuItem className="cursor-pointer" onClick={handleOpenModal}>
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
