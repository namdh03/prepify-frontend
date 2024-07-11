import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "react-toastify";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";

import { GET_TABLE_SETTINGS_QUERY_KEY, updateSetting } from "~apis/setting.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~components/ui/dropdown-menu";
import Button from "~layouts/AdminLayout/components/Button";
import { SettingType } from "~types/setting.type";
import { SETTING_TEXT_MAP, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

import Modal from "../Modal";
import { ModalFormType } from "../Modal/Modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<SettingType>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: (value: number) => updateSetting(row.original.id, value),
  });

  const handleOpenModal = () => setOpen(true);

  const handleOpenModalChange = (value: boolean) => setOpen(value);

  const handleUpdateConfig = async (values: ModalFormType, reset: UseFormReset<ModalFormType>) => {
    await mutateAsync(values.value, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_TABLE_SETTINGS_QUERY_KEY] });
        reset({ value: values.value });
        setOpen(false);
        toast.success(SYSTEM_MESSAGES.UPDATE_SUCCESS);
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
        type={row.original.type}
        open={open}
        onOpenChange={handleOpenModalChange}
        title="Chỉnh sử cài đặt"
        description={`Bạn có thể chỉnh sửa ${SETTING_TEXT_MAP[row.original.type].toLowerCase()} ở đây`}
        onSubmit={handleUpdateConfig}
        submitText="Cập nhật"
        defaultValue={row.original.value}
      />

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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
