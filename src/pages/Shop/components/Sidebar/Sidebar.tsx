import { memo } from "react";

import { Button } from "~components/ui/button";

import Filter from "../Filter";

const Sidebar = memo(() => {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-[30px]">
        <h2 className="text-[#191720] text-xl font-bold leading-[30px]">Bộ lọc tìm kiếm</h2>
        <Button type="button" variant={"link"} className="text-[#575363] text-base font-normal leading-7">
          Xóa tất cả
        </Button>
      </div>

      <div className="mt-[30px]">
        <Filter />
      </div>
    </div>
  );
});

export default Sidebar;
