import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";

import { createCategory, GET_CATEGORIES_QUERY_KEY, GET_TABLE_CATEGORIES_QUERY_KEY } from "~apis/category.api";
import DataTableViewOptions from "~components/common/DataTableViewOptions";
import { Input } from "~components/ui/input";
import Button from "~layouts/AdminLayout/components/Button";
import { CreateCategoryBody } from "~types/category.type";
import { CATEGORY_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

import Modal from "../Modal";
import { ModalFormType } from "../Modal/Modal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;
  const columnName = table.getAllColumns().find((column) => column.id === "name");
  const { mutateAsync } = useMutation({
    mutationFn: (body: CreateCategoryBody) => createCategory(body),
  });

  const handleOpenModal = () => setOpen(true);

  const handleOpenModalChange = (value: boolean) => setOpen(value);

  const handleCreateCategory = async (values: ModalFormType, reset: UseFormReset<ModalFormType>) => {
    await mutateAsync(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
        queryClient.invalidateQueries({ queryKey: [GET_TABLE_CATEGORIES_QUERY_KEY] });
        reset({ name: values.name });
        setOpen(false);
        toast.success(CATEGORY_MESSAGES.CREATE_CATEGORY_SUCCESS);
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
        else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Tìm kiếm phân loại công thức..."
          value={(columnName?.getFilterValue() as string) ?? ""}
          onChange={(event) => columnName?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="flex items-end gap-1 h-8 px-2 lg:px-3"
          >
            Xóa bộ lọc
            <RxCross2 size={16} className="mb-[1px]" />
          </Button>
        )}
      </div>

      <div className="flex gap-3">
        <Button size={"sm"} onClick={handleOpenModal}>
          <FiPlusCircle size={16} className="mr-2" />
          Tạo mới phân loại
        </Button>
        <DataTableViewOptions table={table} className="w-48" />
      </div>

      {/* Create Category Modal */}
      <Modal
        open={open}
        onOpenChange={handleOpenModalChange}
        title="Tạo mới phân loại"
        description="Phân loại giúp bạn phân loại các công thức một cách dễ dàng hơn."
        onSubmit={handleCreateCategory}
        submitText="Tạo mới"
      />
    </div>
  );
}
