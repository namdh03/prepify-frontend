import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~components/ui/dropdown-menu";
import configs from "~configs";
import Button from "~layouts/AdminLayout/components/Button";
import { TableIngredientType } from "~types/ingredient.type";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableIngredientType>) {
  const navigate = useNavigate();
  const handleNavigateToDetail = () => {
    navigate(configs.routes.updateIngredient.replace(":ingredientId", row.original.id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-16">
        <DropdownMenuItem className="cursor-pointer" onClick={handleNavigateToDetail}>
          <DropdownMenuShortcut className="ml-0 mr-2">
            <FiEdit3 size={16} />
          </DropdownMenuShortcut>
          Chỉnh Sửa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableRowActions;
