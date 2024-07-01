import { useCallback, useState } from "react";

import { ColumnFiltersState, PaginationState, SortingState, Table } from "@tanstack/react-table";

import DataTable from "~components/common/DataTable";
import useDebounce from "~hooks/useDebounce";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useGetTableCategories from "~hooks/useGetTableCategories";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";
import { TableCategoryType } from "~types/category.type";
import { DEFAULT_DEBOUNCE_TIME, PAGE, TABLE_LIMIT } from "~utils/constants";

import DataTableToolbar from "./components/DataTableToolbar";
import { columns } from "./data/columns";

const categories: TableCategoryType[] = [
  {
    id: "1",
    name: "Thịt",
    totalRecipes: 0,
  },
  {
    id: "2",
    name: "Rau cải",
    totalRecipes: 5,
  },
  {
    id: "3",
    name: "Hải sản",
    totalRecipes: 7,
  },
  {
    id: "4",
    name: "Đồ uống",
    totalRecipes: 3,
  },
  {
    id: "5",
    name: "Thịt",
    totalRecipes: 10,
  },
  {
    id: "6",
    name: "Rau cải",
    totalRecipes: 5,
  },
  {
    id: "7",
    name: "Hải sản",
    totalRecipes: 7,
  },
  {
    id: "8",
    name: "Đồ uống",
    totalRecipes: 3,
  },
  {
    id: "9",
    name: "Thịt",
    totalRecipes: 10,
  },
  {
    id: "10",
    name: "Rau cải",
    totalRecipes: 5,
  },
];

export default function CategoryList() {
  useDocumentTitle("Prepify | Danh sách phân loại công thức");

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

  const { data, isLoading } = useGetTableCategories({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const handleRenderToolbar = useCallback((table: Table<TableCategoryType>) => <DataTableToolbar table={table} />, []);

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh sách phân loại công thức</h2>
          <p className="text-muted-foreground">
            Hiển thị danh sách phân loại công thức và số lượng công thức tương ứng
          </p>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          isTableDataLoading={isLoading}
          paginatedTableData={{
            data: categories || [],
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
