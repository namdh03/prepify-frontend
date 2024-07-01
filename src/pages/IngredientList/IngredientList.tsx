import { useCallback, useState } from "react";

import { ColumnFiltersState, PaginationState, SortingState, Table } from "@tanstack/react-table";

import images from "~assets/imgs";
import DataTable from "~components/common/DataTable";
import useDebounce from "~hooks/useDebounce";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useGetTableIngredients from "~hooks/useGetTableIngredients";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";
import { TableIngredientType } from "~types/ingredient.type";
import { DEFAULT_DEBOUNCE_TIME, PAGE, TABLE_LIMIT } from "~utils/constants";

import DataTableToolbar from "./components/DataTableToolbar";
import { columns } from "./data/columns";

const ingredients: TableIngredientType[] = [
  {
    id: "1",
    name: "Gói nguyên liệu 1",
    category: "Thịt",
    price: 100000,
    image: images.suggest1st,
    unit: "kg",
  },
  {
    id: "2",
    name: "Gói nguyên liệu 2",
    category: "Rau cải",
    price: 200000,
    image: images.suggest2nd,
    unit: "kg",
  },
  {
    id: "3",
    name: "Gói nguyên liệu 3",
    category: "Thịt",
    price: 200000,
    image: images.suggest1st,
    unit: "kg",
  },
  {
    id: "4",
    name: "Gói nguyên liệu 4",
    category: "Thịt",
    price: 200000,
    image: images.suggest2nd,
    unit: "kg",
  },
  {
    id: "5",
    name: "Gói nguyên liệu 5",
    category: "Thịt",
    price: 200000,
    image: images.suggest1st,
    unit: "kg",
  },
  {
    id: "6",
    name: "Gói nguyên liệu 6",
    category: "Thịt",
    price: 200000,
    image: images.suggest2nd,
    unit: "kg",
  },
  {
    id: "7",
    name: "Gói nguyên liệu 7",
    category: "Thịt",
    price: 200000,
    image: images.suggest1st,
    unit: "kg",
  },
  {
    id: "8",
    name: "Gói nguyên liệu 8",
    category: "Thịt",
    price: 200000,
    image: images.suggest2nd,
    unit: "kg",
  },
  {
    id: "9",
    name: "Gói nguyên liệu 9",
    category: "Thịt",
    price: 200000,
    image: images.suggest1st,
    unit: "kg",
  },
  {
    id: "10",
    name: "Gói nguyên liệu 10",
    category: "Thịt",
    price: 200000,
    image: images.suggest2nd,
    unit: "kg",
  },
];

export default function IngredientList() {
  useDocumentTitle("Prepify | Danh sách nguyên liệu");

  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, DEFAULT_DEBOUNCE_TIME);

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE - 1, //initial page index
    pageSize: TABLE_LIMIT, //default page size
  });

  const { data, isLoading } = useGetTableIngredients({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const handleRenderToolbar = useCallback(
    (table: Table<TableIngredientType>) => <DataTableToolbar table={table} />,
    [],
  );

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh sách nguyên liệu</h2>
          <p className="text-muted-foreground">
            Hiển thị tất cả các nguyên liệu mà bạn đã tạo. Bạn có thể thêm, sửa hoặc xóa nguyên liệu tại đây.
          </p>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          isTableDataLoading={isLoading}
          paginatedTableData={{
            data: ingredients || [],
            itemTotal: data?.itemTotal || 0,
            pageTotal: data?.pageTotal || 0,
            pageSize: data?.pageSize || TABLE_LIMIT,
            pageIndex: data?.pageIndex || PAGE - 1,
          }}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          toolbar={handleRenderToolbar}
        />
      </div>
    </LayoutBody>
  );
}
