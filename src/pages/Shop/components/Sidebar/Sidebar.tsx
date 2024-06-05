import { memo } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "~components/ui/button";
import { ShopSidebarParamType } from "~contexts/shop/shop.type";
import useShop from "~hooks/useShop";
import { PAGE } from "~utils/constants";

import Filter from "../Filter";

const Sidebar = memo(() => {
  const [params, setParams] = useSearchParams();
  const { form, formRefs } = useShop();

  const onResetSidebar = () => {
    form.reset({
      ...formRefs.current,
      sidebar: {
        cuisine: [],
        diet: [],
        occasion: [],
        price: [],
        evaluate: [],
      },
      page: PAGE,
    });

    (["cuisine", "diet", "occasion", "price", "evaluate"] as ShopSidebarParamType[]).forEach((param) =>
      params.delete(param),
    );
    if (params.size > 0) params.set("page", PAGE.toString());

    setParams(params);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-[30px]">
        <h2 className="text-[#191720] text-xl font-bold leading-[30px]">Bộ lọc tìm kiếm</h2>
        <Button
          type="button"
          variant={"link"}
          className="text-[#575363] text-base font-normal leading-7"
          onClick={onResetSidebar}
        >
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
