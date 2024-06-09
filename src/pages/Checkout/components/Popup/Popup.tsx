import { memo } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~components/ui/dialog";
import { SYSTEM_MESSAGES } from "~utils/constants";

interface PopupProps {
  open: boolean;
}

const Popup = memo(({ open }: PopupProps) => {
  return (
    <Dialog defaultOpen={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{SYSTEM_MESSAGES.SOMETHING_WENT_WRONG}</DialogTitle>
          <DialogDescription>
            Một số sản phẩm trong giỏ hàng vừa được cập nhật, bạn vui lòng kiểm tra và thử lại.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
});

export default Popup;
