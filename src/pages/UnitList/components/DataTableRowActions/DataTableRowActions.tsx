import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
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
import { TableUnitType } from "~types/unit.type";
import { UnitEnum, UnitText } from "~utils/enums";

import Modal from "../Modal";
import { ModalFormType } from "../Modal/Modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableUnitType>) {
  const [open, setOpen] = useState({
    alert: false,
    modal: false,
  });
  const totalIngredient = row.original.totalIngredients;
  const totalRecipeIngredient = row.original.totalRecipeIngredients;
  const totalRecipeNutrition = row.original.totalRecipeNutritions;

  const handleOpenAlert = () => setOpen((prev) => ({ ...prev, alert: true }));

  const handleOpenAlertChange = (value: boolean) => setOpen((prev) => ({ ...prev, alert: value }));

  const handleOpenModal = () => setOpen((prev) => ({ ...prev, modal: true }));

  const handleOpenModalChange = (value: boolean) => setOpen((prev) => ({ ...prev, modal: value }));

  const handleUpdateUnit = async (values: ModalFormType, reset: UseFormReset<ModalFormType>) => {
    console.log("handleUpdateUnit", values);
    reset();
  };

  const handleDeleteUnit = () => {
    console.log("handleDeleteUnit");
  };

  return (
    <>
      <Modal
        open={open.modal}
        onOpenChange={handleOpenModalChange}
        title="Chỉnh sửa đơn vị"
        description="Chỉnh sửa thông tin đơn vị của bạn."
        onSubmit={handleUpdateUnit}
        submitText="Cập nhật"
        defaultName={row.original.name}
        defaultOptionType={
          row.original.type === UnitEnum.ALL
            ? [
                {
                  label: UnitText.INGREDIENT,
                  value: UnitEnum.INGREDIENT,
                },
                {
                  label: UnitText.NUTRITION,
                  value: UnitEnum.NUTRITION,
                },
              ]
            : [
                {
                  label: UnitText[row.original.type.toUpperCase() as keyof typeof UnitText],
                  value: row.original.type,
                },
              ]
        }
      />

      <AlertDialog open={open.alert} onOpenChange={handleOpenAlertChange}>
        {totalIngredient > 0 || totalRecipeIngredient > 0 || totalRecipeNutrition > 0 ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Không thể xóa đơn vị này</AlertDialogTitle>
              <AlertDialogDescription>
                Đơn vị này đang được sử dụng trong{" "}
                {totalIngredient > 0 && (
                  <>
                    <strong className="text-primary">{totalIngredient}</strong> nguyên liệu
                  </>
                )}
                {totalIngredient > 0 && totalRecipeIngredient > 0 && ", "}
                {totalRecipeIngredient > 0 && (
                  <>
                    <strong className="text-primary">{totalRecipeIngredient}</strong> nguyên liệu trong công thức
                  </>
                )}
                {(totalIngredient > 0 || totalRecipeIngredient > 0) && totalRecipeNutrition > 0 && ", "}
                {totalRecipeNutrition > 0 && (
                  <>
                    <strong className="text-primary">{totalRecipeNutrition}</strong> chất dinh dưỡng trong công thức
                  </>
                )}
                .
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
              <AlertDialogCancel onClick={handleDeleteUnit}>Tiếp tục</AlertDialogCancel>
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
            Xoá Đơn Vị
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
