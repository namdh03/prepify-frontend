import { memo } from "react";
import { LuTrash } from "react-icons/lu";

import AlertDialog from "~components/common/AlertDialog";
import { Button } from "~components/ui/button";
import { CollapsibleContent } from "~components/ui/collapsible";
import { TableCell, TableRow } from "~components/ui/table";
import { ExtraSpice } from "~types/cart.type";

interface SpiceProps {
  spice: ExtraSpice;
}

const Spice = memo(({ spice }: SpiceProps) => {
  const handleDelete = () => {
    console.log(`CALL API TO DELETE SPICE WITH ID: ${spice.id}`);
  };

  return (
    <CollapsibleContent asChild>
      <TableRow className="text-center [&>*]:p-4">
        <TableCell colSpan={2} className="text-left">
          <article className="ml-24">
            <section className="flex items-center gap-[10px]">
              <img src={spice.image} alt="" className="w-20 h-20 rounded-[5px] object-contain" />
              <h5 className="w-44 text-sm font-normal leading-5 line-clamp-3 break-keep">{spice.name}</h5>
            </section>
          </article>
        </TableCell>
        <TableCell>
          <span className="block text-center text-sm font-normal leading-5">
            <sup>₫</sup>
            {spice.price.toLocaleString()}
          </span>
        </TableCell>
        <TableCell>1</TableCell>
        <TableCell>
          <span className="block text-center text-primary text-sm font-normal leading-5">
            <sup>₫</sup>
            {spice.price.toLocaleString()}
          </span>
        </TableCell>
        <TableCell>
          <AlertDialog
            trigger={
              <Button variant={"ghost"} size={"icon"}>
                <LuTrash size={20} />
              </Button>
            }
            title="Bạn có muốn bỏ gói gia vị này?"
            cancelText="TRỞ LẠI"
            actionText="CÓ"
            onAction={handleDelete}
            reverse
            className="[&_h2]:font-normal"
          />
        </TableCell>
      </TableRow>
    </CollapsibleContent>
  );
});

export default Spice;
