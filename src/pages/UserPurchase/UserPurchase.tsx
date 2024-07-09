import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  GET_LIST_ORDER_BY_STATUS_QUERY_KEY,
  GET_LIST_ORDER_BY_STATUS_STALE_TIME,
  getListOrderByStatus,
} from "~apis/order.api";
import { Separator } from "~components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs";
import useDocumentTitle from "~hooks/useDocumentTitle";
import { CusOrderListData, OrderQueries } from "~types/order.type";
import { ORDER_STATUS_TEXT_MAP } from "~utils/constants";
import { OrderStatus } from "~utils/enums";

import All from "./components/All";
import Canceled from "./components/Canceled";
import Created from "./components/Created";
import Delivered from "./components/Delivered";
import Delivering from "./components/Delivering";
import PickUp from "./components/PickUp";
import Waiting from "./components/Waiting";

export interface OrderProps {
  orders?: CusOrderListData[];
}

const tabItems = [
  { value: "ALL", label: "Tất cả" },
  { value: OrderStatus.WAITING, label: ORDER_STATUS_TEXT_MAP[OrderStatus.WAITING] },
  { value: OrderStatus.CREATED, label: ORDER_STATUS_TEXT_MAP[OrderStatus.CREATED] },
  { value: OrderStatus.PICKED_UP, label: ORDER_STATUS_TEXT_MAP[OrderStatus.PICKED_UP] },
  { value: OrderStatus.DELIVERING, label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELIVERING] },
  { value: OrderStatus.DELIVERED, label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELIVERED] },
  { value: OrderStatus.CANCELED, label: ORDER_STATUS_TEXT_MAP[OrderStatus.CANCELED] },
];

const UserPurchase = () => {
  useDocumentTitle("Prepify | Đơn hàng của tôi");

  const [params, setParams] = useSearchParams();
  const queries: OrderQueries = useMemo(() => Object.fromEntries(params.entries()), [params]);
  const { data } = useQuery({
    queryKey: [GET_LIST_ORDER_BY_STATUS_QUERY_KEY, queries],
    queryFn: getListOrderByStatus,
    select: (data) => data.data.data,
    staleTime: GET_LIST_ORDER_BY_STATUS_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const tabContents = useMemo(
    () => [
      {
        value: "ALL",
        component: <All orders={data} />,
      },
      {
        value: OrderStatus.WAITING,
        component: <Waiting orders={data} />,
      },
      {
        value: OrderStatus.CREATED,
        component: <Created orders={data} />,
      },
      {
        value: OrderStatus.PICKED_UP,
        component: <PickUp orders={data} />,
      },
      {
        value: OrderStatus.DELIVERING,
        component: <Delivering orders={data} />,
      },
      {
        value: OrderStatus.DELIVERED,
        component: <Delivered orders={data} />,
      },
      {
        value: OrderStatus.CANCELED,
        component: <Canceled orders={data} />,
      },
    ],
    [data],
  );

  useEffect(() => {
    if (!params.has("tab")) setParams({ tab: "ALL" });
  }, [params, setParams]);

  const getDefaultValue = useCallback(() => {
    const tab = tabItems.find((item) => item.value === params.get("tab"));
    return tab ? tab.value : "ALL";
  }, [params]);

  const handleTabChange = useCallback(
    (value: string) => {
      setParams({ tab: value });
    },
    [setParams],
  );

  return (
    <Tabs defaultValue={getDefaultValue()}>
      <TabsList className="grid grid-cols-7 w-full h-fit bg-white p-0">
        {tabItems.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="py-3 text-[rgba(0,0,0,.8)] data-[state=active]:bg-primary data-[state=active]:text-white"
            onClick={() => handleTabChange(item.value)}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <Separator className="my-3" />

      {tabContents.map((tabContent) => (
        <TabsContent key={tabContent.value} value={tabContent.value}>
          {tabContent.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default UserPurchase;
