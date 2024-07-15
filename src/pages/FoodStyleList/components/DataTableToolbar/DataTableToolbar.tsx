import { useState } from "react";
import { UseFormReset } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";

import {
  createFoodStyle,
  GET_FOOD_STYLES_QUERY_KEY,
  GET_FOOD_STYLES_STALE_TIME,
  GET_TABLE_FOOD_STYLES_QUERY_KEY,
  getFoodStyles,
} from "~apis/food-style.api";
import DataTableFacetedFilter from "~components/common/DataTableFacetedFilter";
import DataTableViewOptions from "~components/common/DataTableViewOptions";
import { Input } from "~components/ui/input";
import Button from "~layouts/AdminLayout/components/Button";
import { CreateFoodStyleBody } from "~types/food-style.type";
import { FOOD_STYLE_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
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
  const columnTitle = table.getAllColumns().find((column) => column.id === "title");
  const { data } = useQuery({
    queryKey: [GET_FOOD_STYLES_QUERY_KEY],
    queryFn: () => getFoodStyles(),
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
    staleTime: GET_FOOD_STYLES_STALE_TIME,
  });
  const { mutateAsync: createFoodStyleMutateAsync, isPending: isCreateFoodStylePending } = useMutation({
    mutationFn: (body: CreateFoodStyleBody) => createFoodStyle(body),
  });

  const handleOpenModal = () => setOpen(true);

  const handleOpenModalChange = (value: boolean) => setOpen(value);

  const handleCreateFoodStyle = async (values: ModalFormType, reset: UseFormReset<ModalFormType>) => {
    await createFoodStyleMutateAsync(
      {
        name: values.name,
        title: values.title[0].label,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [GET_FOOD_STYLES_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [GET_TABLE_FOOD_STYLES_QUERY_KEY] });
          reset();
          setOpen(false);
          toast.success(FOOD_STYLE_MESSAGES.CREATE_FOOD_STYLE_SUCCESS);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
          else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Tìm kiếm phong cách ẩm thực..."
          value={(columnName?.getFilterValue() as string) ?? ""}
          onChange={(event) => columnName?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex gap-x-2">
          {data && (
            <DataTableFacetedFilter
              column={columnTitle}
              title="Tiêu đề"
              options={data.map((item) => ({ value: item.type, label: item.title }))}
            />
          )}
        </div>

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
          Tạo mới phong cách ẩm thực
        </Button>
        <DataTableViewOptions table={table} className="w-48" />
      </div>

      {/* Create Food Style Modal */}
      <Modal
        open={open}
        onOpenChange={handleOpenModalChange}
        title="Tạo phong cách ẩm thực mới"
        description="Phong cách ẩm thực sẽ giúp người dùng dễ dàng tìm kiếm công thức ẩm thực phù hợp với sở thích của mình"
        onSubmit={handleCreateFoodStyle}
        submitText="Tạo mới"
        loading={isCreateFoodStylePending}
      />
    </div>
  );
}
