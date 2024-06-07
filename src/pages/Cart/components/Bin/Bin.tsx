import { memo } from "react";
import { LuTrash } from "react-icons/lu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~components/ui/alert-dialog";
import { Button } from "~components/ui/button";

interface BinProps {
  id: string;
}

const Bin = memo(({ id }: BinProps) => {
  const handleDelete = () => {
    console.log(`CALL API TO DELETE ITEM WITH ID: ${id}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="relative left-1/2 -translate-x-1/2">
          <LuTrash size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">Bạn có muốn bỏ sản phẩm này?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>TRỞ LẠI</AlertDialogAction>
          <AlertDialogCancel onClick={handleDelete}>CÓ</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default Bin;
