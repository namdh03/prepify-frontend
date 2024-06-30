import { useCallback, useState } from "react";

import { ColumnFiltersState, PaginationState, SortingState, Table } from "@tanstack/react-table";

import images from "~assets/imgs";
import DataTable from "~components/common/DataTable";
import useDebounce from "~hooks/useDebounce";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useGetTableRecipes from "~hooks/useGetTableRecipes";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";
import { TableRecipeType } from "~types/recipes.type";
import { DEFAULT_DEBOUNCE_TIME, PAGE, TABLE_LIMIT } from "~utils/constants";
import { LevelCook } from "~utils/enums";

import DataTableToolbar from "./components/DataTableToolbar";
import { columns } from "./data/columns";

const recipes: TableRecipeType[] = [
  {
    id: "1",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
  {
    id: "2",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.MEDIUM,
    slug: "bun-rieu",
  },
  {
    id: "3",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.HARD,
    slug: "bun-rieu",
  },
  {
    id: "4",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
  {
    id: "5",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
  {
    id: "6",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
  {
    id: "7",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
  {
    id: "8",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
  {
    id: "9",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
  {
    id: "10",
    name: "Bún riêu",
    category: {
      id: "1",
      name: "Món chính",
    },
    time: 30,
    image: images.suggest1st,
    level: LevelCook.EASY,
    slug: "bun-rieu",
  },
];

export default function RecipeList() {
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

  const { data, isLoading } = useGetTableRecipes({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const handleRenderToolbar = useCallback((table: Table<TableRecipeType>) => <DataTableToolbar table={table} />, []);

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh sách công thức</h2>
          <p className="text-muted-foreground">Hiển thị danh sách công thức mà bạn đã tạo</p>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          isTableDataLoading={isLoading}
          paginatedTableData={{
            data: recipes,
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
