import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";

import { deleteRecipe, GET_TABLE_RECIPES_QUERY_KEY } from "~apis/recipe.api";
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
import configs from "~configs";
import Button from "~layouts/AdminLayout/components/Button";
import { TableRecipeType } from "~types/recipe.type";
import { RECIPE_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableRecipeType>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { mutate: deleteRecipeMutate } = useMutation({
    mutationFn: () => deleteRecipe(row.original.id),
  });

  const handleOpenDialog = () => setOpen(true);

  const handleOpenDialogChange = (value: boolean) => setOpen(value);

  const handleDeleteRecipe = () => {
    deleteRecipeMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_TABLE_RECIPES_QUERY_KEY] });
        toast.success(RECIPE_MESSAGES.DELETE_RECIPE_SUCCESS);
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
        {row.original.totalmealkit > 0 ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Không thể xóa công thức</AlertDialogTitle>
              <AlertDialogDescription>
                Công thức này đang được sử dụng trong{" "}
                <strong className="text-primary">{row.original.totalmealkit} gói nguyên liệu</strong>. Vui lòng xóa các
                gói nguyên liệu trước khi xóa công thức.
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
                <strong className="text-primary">công thức</strong> của bạn và xóa dữ liệu của bạn khỏi máy chủ.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleDeleteRecipe}>Tiếp tục</AlertDialogCancel>
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
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="cursor-pointer">
            <DropdownMenuShortcut className="ml-0 mr-2">
              <IoEyeOutline size={16} />
            </DropdownMenuShortcut>
            Xem Chi Tiết
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigate(configs.routes.updateRecipe.replace(":recipeId", row.original.id));
            }}
          >
            <DropdownMenuShortcut className="ml-0 mr-2">
              <FiEdit3 size={16} />
            </DropdownMenuShortcut>
            Chỉnh Sửa
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={handleOpenDialog}>
            <DropdownMenuShortcut className="ml-0 mr-2">
              <RiDeleteBinLine size={16} />
            </DropdownMenuShortcut>
            Xoá Công Thức
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
