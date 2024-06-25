import { memo, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~components/ui/dialog";
import useCheckout from "~hooks/useCheckout";
import { SYSTEM_MESSAGES } from "~utils/constants";

const Popup = memo(() => {
  const { checkout } = useCheckout();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (checkout?.items.length === 0 || !checkout) setOpen(true);
  }, [checkout]);

  const handleOpenChange = (value: boolean) => setOpen(value);

  return (
    !checkout && (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{SYSTEM_MESSAGES.SOMETHING_WENT_WRONG}</DialogTitle>
            <DialogDescription>
              Một số sản phẩm trong giỏ hàng vừa được cập nhật, bạn vui lòng kiểm tra và thử lại.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  );
});

export default Popup;
