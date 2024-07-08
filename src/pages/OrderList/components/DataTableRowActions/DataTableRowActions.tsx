import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~components/ui/dropdown-menu";
import Button from "~layouts/AdminLayout/components/Button";
import { TableOrderType } from "~types/order.type";

import Modal from "../Modal";

export interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<TableOrderType>) {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const handleOpenDialogChange = (value: boolean) => setOpen(value);

  return (
    <>
      <Modal row={row} open={open} onOpen={handleOpenDialogChange} onClose={handleCloseDialog} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="cursor-pointer" onClick={handleOpenDialog}>
            <DropdownMenuShortcut className="ml-0 mr-2">
              <IoEyeOutline size={16} />
            </DropdownMenuShortcut>
            Xem Chi Tiết
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;
