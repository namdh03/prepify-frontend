import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";

import { GET_FOOD_STYLES_QUERY_KEY, GET_TABLE_FOOD_STYLES_QUERY_KEY, updateFoodStyle } from "~apis/food-style.api";
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
import { TableFoodStyleType, UpdateFoodStyleBody } from "~types/food-style.type";
import { FOOD_STYLE_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

import Modal, { ModalFormType } from "../Modal/Modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableFoodStyleType>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState({
    alert: false,
    modal: false,
  });
  const { mutateAsync: updateFoodStyleMutateAsync } = useMutation({
    mutationFn: (body: UpdateFoodStyleBody) => updateFoodStyle(row.original.id, body),
  });

  const handleOpenAlert = () => setOpen((prev) => ({ ...prev, alert: true }));

  const handleOpenAlertChange = (value: boolean) => setOpen((prev) => ({ ...prev, alert: value }));

  const handleOpenModal = () => setOpen((prev) => ({ ...prev, modal: true }));

  const handleOpenModalChange = (value: boolean) => setOpen((prev) => ({ ...prev, modal: value }));

  const handleUpdateFoodStyle = async (values: ModalFormType, reset: UseFormReset<ModalFormType>) => {
    await updateFoodStyleMutateAsync(
      {
        title: values.title[0].label,
        name: values.name,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [GET_FOOD_STYLES_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [GET_TABLE_FOOD_STYLES_QUERY_KEY] });
          reset({ name: values.name, title: values.title });
          setOpen((prev) => ({ ...prev, modal: false }));
          toast.success(FOOD_STYLE_MESSAGES.UPDATE_FOOD_STYLE_SUCCESS);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
          else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  const handleDeleteFoodStyle = () => {
    console.log("Delete Item", row.original.id);
  };

  return (
    <>
      <Modal
        open={open.modal}
        onOpenChange={handleOpenModalChange}
        title="Chỉnh sửa phong cách ẩm thực"
        description="Chỉnh sửa thông tin phong cách ẩm thực của bạn."
        onSubmit={handleUpdateFoodStyle}
        submitText="Cập nhật"
        defaultValues={{
          title: [{ value: row.original.title, label: row.original.title }],
          name: row.original.name,
        }}
      />

      <AlertDialog open={open.alert} onOpenChange={handleOpenAlertChange}>
        {row.original.totalRecipes > 0 ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Không thể xóa phong cách ẩm thực</AlertDialogTitle>
              <AlertDialogDescription>
                Phong cách ẩm thực này đang được sử dụng trong{" "}
                <strong className="text-primary">{row.original.totalRecipes} công thức</strong>. Vui lòng xóa các công
                thức trước khi xóa phong cách ẩm thực.
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
                <strong className="text-primary">phong cách ẩm thực</strong> của bạn và xóa dữ liệu của bạn khỏi máy
                chủ.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteFoodStyle}>Tiếp tục</AlertDialogCancel>
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
        <DropdownMenuContent align="end" className="w-60">
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
            Xoá phong cách ẩm thực
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
