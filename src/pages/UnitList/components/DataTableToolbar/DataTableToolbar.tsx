import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import { Table } from "@tanstack/react-table";

import DataTableViewOptions from "~components/common/DataTableViewOptions";
import { Input } from "~components/ui/input";
import Button from "~layouts/AdminLayout/components/Button";

import Modal from "../Modal";
import { ModalFormType } from "../Modal/Modal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [open, setOpen] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;
  const columnName = table.getAllColumns().find((column) => column.id === "name");

  const handleOpenModal = () => setOpen(true);

  const handleOpenModalChange = (value: boolean) => setOpen(value);

  const handleCreateUnit = async (values: ModalFormType) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Tìm kiếm đơn vị công thức..."
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
          Tạo mới đơn vị
        </Button>
        <DataTableViewOptions table={table} className="w-48" />
      </div>

      {/* Create Unit Modal */}
      <Modal
        open={open}
        onOpenChange={handleOpenModalChange}
        title="Tạo mới đơn vị"
        description="Đơn vị sử dụng trong công thức, nguyên liệu, chất dinh dưỡng..."
        onSubmit={handleCreateUnit}
        submitText="Tạo mới"
      />
    </div>
  );
}
