import useDocumentTitle from "~hooks/useDocumentTitle";
import { LayoutBody } from "~layouts/AdminLayout/components/Layout";

import DataTable from "./components/DataTable";
import { columns } from "./data/columns";
import { recipes } from "./data/recipes";

export default function RecipeList() {
  useDocumentTitle("Prepify | Danh sách công thức");

  return (
    <LayoutBody className="flex flex-col" fixedHeight>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Danh sách công thức</h2>
          <p className="text-muted-foreground">Hiển thị danh sách công thức mà bạn đã tạo</p>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable data={recipes} columns={columns} />
      </div>
    </LayoutBody>
  );
}
