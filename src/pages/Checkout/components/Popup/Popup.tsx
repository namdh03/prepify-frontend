import { memo } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~components/ui/dialog";
import { SYSTEM_MESSAGES } from "~utils/constants";

const Popup = memo(() => {
  return (
    <Dialog defaultOpen>
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
