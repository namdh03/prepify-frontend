import { useQuery } from "@tanstack/react-query";

import { GET_TABLE_SETTINGS_QUERY_KEY, GET_TABLE_SETTINGS_STALE_TIME, getTableSettings } from "~apis/setting.api";
import DataTable from "~components/common/DataTable";
import useDocumentTitle from "~hooks/useDocumentTitle";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";
import { PAGE } from "~utils/constants";

import { columns } from "./data/columns";

export default function ModSettings() {
  useDocumentTitle("Prepify | Cài đặt");

  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_SETTINGS_QUERY_KEY],
    queryFn: () => getTableSettings(),
    staleTime: GET_TABLE_SETTINGS_STALE_TIME,
    select: (data) => data.data.data,
    refetchOnWindowFocus: false,
  });

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
          <p className="text-muted-foreground">Quản lí cài đặt cho ứng dụng</p>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          isTableDataLoading={isLoading}
          paginatedTableData={{
            data: data || [],
            itemTotal: data?.length || 0,
            pageIndex: PAGE - 1,
            pageSize: data?.length || 0,
            pageTotal: PAGE,
          }}
          columns={columns}
        />
      </div>
    </LayoutBody>
  );
}
