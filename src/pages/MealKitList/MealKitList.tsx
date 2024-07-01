import { useCallback, useState } from "react";

import { ColumnFiltersState, PaginationState, SortingState, Table } from "@tanstack/react-table";

import images from "~assets/imgs";
import DataTable from "~components/common/DataTable";
import useDebounce from "~hooks/useDebounce";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useGetTableMealKits from "~hooks/useGetTableMealKits";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";
import { TableMealKitType } from "~types/meal-kit.type";
import { DEFAULT_DEBOUNCE_TIME, PAGE, TABLE_LIMIT } from "~utils/constants";

import DataTableToolbar from "./components/DataTableToolbar";
import { columns } from "./data/columns";

const mealKits: TableMealKitType[] = [
  {
    id: "1",
    name: "Gói thực phẩm 1",
    serving: 2,
    price: 100000,
    status: true,
    extraSpice: null,
    image: images.suggest1st,
  },
  {
    id: "2",
    name: "Gói thực phẩm 2",
    serving: 4,
    price: 200000,
    status: false,
    extraSpice: null,
    image: images.suggest2nd,
  },
  {
    id: "3",
    name: "Gói thực phẩm 3",
    serving: 4,
    price: 200000,
    status: true,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest1st,
    },
    image: images.suggest1st,
  },
  {
    id: "4",
    name: "Gói thực phẩm 4",
    serving: 4,
    price: 200000,
    status: false,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest2nd,
    },
    image: images.suggest2nd,
  },
  {
    id: "5",
    name: "Gói thực phẩm 5",
    serving: 4,
    price: 200000,
    status: true,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest1st,
    },
    image: images.suggest1st,
  },
  {
    id: "6",
    name: "Gói thực phẩm 6",
    serving: 4,
    price: 200000,
    status: false,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest2nd,
    },
    image: images.suggest2nd,
  },
  {
    id: "7",
    name: "Gói thực phẩm 7",
    serving: 4,
    price: 200000,
    status: true,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest1st,
    },
    image: images.suggest1st,
  },
  {
    id: "8",
    name: "Gói thực phẩm 8",
    serving: 4,
    price: 200000,
    status: false,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest2nd,
    },
    image: images.suggest2nd,
  },
  {
    id: "9",
    name: "Gói thực phẩm 9",
    serving: 4,
    price: 200000,
    status: true,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest1st,
    },
    image: images.suggest1st,
  },
  {
    id: "10",
    name: "Gói thực phẩm 10",
    serving: 4,
    price: 200000,
    status: false,
    extraSpice: {
      id: "1",
      name: "Tiêu",
      price: 5000,
      image: images.suggest2nd,
    },
    image: images.suggest2nd,
  },
];

export default function MealKitList() {
  useDocumentTitle("Prepify | Danh sách công thức");

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

  const { data, isLoading } = useGetTableMealKits({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const handleRenderToolbar = useCallback((table: Table<TableMealKitType>) => <DataTableToolbar table={table} />, []);

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh sách gói thực phẩm</h2>
          <p className="text-muted-foreground">
            Hiển thị tất cả các gói thực phẩm mà bạn đã tạo. Bạn có thể thêm, sửa hoặc xóa gói thực phẩm tại đây.
          </p>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          isTableDataLoading={isLoading}
          paginatedTableData={{
            data: mealKits || [],
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
