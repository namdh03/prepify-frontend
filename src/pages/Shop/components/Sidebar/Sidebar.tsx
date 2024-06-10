import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_FOOD_STYLES_QUERY_KEY, getFoodStyles } from "~apis/food-styles.api";
import { Button } from "~components/ui/button";
import { shopDefaultValues } from "~contexts/shop/shop.schema";
import useShop from "~hooks/useShop";
import sidebar from "~pages/Shop/data/sidebar";
import { FoodStyleItem } from "~types/food-styles.type";

import Filter from "../Filter";

const Sidebar = memo(() => {
  const [params, setParams] = useSearchParams();
  const { form } = useShop();
  const { data } = useQuery({
    queryKey: [GET_FOOD_STYLES_QUERY_KEY],
    queryFn: () => getFoodStyles(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [sidebarFilters, setSidebarFilters] = useState<FoodStyleItem[]>(sidebar);

  useEffect(() => {
    const foodStyles = data && data.data.data;
    if (!foodStyles) return;
    setSidebarFilters((prev) => [...foodStyles, ...prev]);

    return () => {
      setSidebarFilters(sidebar);
    };
  }, [data]);

  // Reset form when the URL params are empty
  useEffect(() => {
    if (params.size === 0) {
      form.reset({
        ...shopDefaultValues,
        sidebar: {
          ...shopDefaultValues.sidebar,
          ...Object.fromEntries(sidebarFilters.map((filter) => [filter.type, []])),
        },
      });
    }
  }, [form, params, sidebarFilters]);

  const onResetSidebar = () => {
    form.reset({
      ...form.getValues(),
      sidebar: {
        ...shopDefaultValues.sidebar,
        ...Object.fromEntries(
          sidebarFilters.map((filter) => {
            params.delete(filter.type);
            return [filter.type, []];
          }),
        ),
      },
    });
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
        <Filter sidebarFilters={sidebarFilters} />
      </div>
    </div>
  );
});

export default Sidebar;
