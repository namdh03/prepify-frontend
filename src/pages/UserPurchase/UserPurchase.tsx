import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Separator } from "~components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs";
import useDocumentTitle from "~hooks/useDocumentTitle";
import { ORDER_STATUS_TEXT_MAP } from "~utils/constants";
import { OrderStatus } from "~utils/enums";

import All from "./components/All";
import Canceled from "./components/Canceled";
import Created from "./components/Created";
import Delayed from "./components/Delayed";
import Delivered from "./components/Delivered";
import Delivering from "./components/Delivering";
import PickUp from "./components/PickUp";
import Waiting from "./components/Waiting";

const tabItems = [
  { value: "ALL", label: "Tất cả" },
  { value: OrderStatus.WAITING, label: ORDER_STATUS_TEXT_MAP[OrderStatus.WAITING] },
  { value: OrderStatus.CREATED, label: ORDER_STATUS_TEXT_MAP[OrderStatus.CREATED] },
  { value: OrderStatus.PICKED_UP, label: ORDER_STATUS_TEXT_MAP[OrderStatus.PICKED_UP] },
  { value: OrderStatus.DELIVERING, label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELIVERING] },
  { value: OrderStatus.DELIVERED, label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELIVERED] },
  { value: OrderStatus.CANCELED, label: ORDER_STATUS_TEXT_MAP[OrderStatus.CANCELED] },
  { value: OrderStatus.DELAYED, label: ORDER_STATUS_TEXT_MAP[OrderStatus.DELAYED] },
];

const UserPurchase = () => {
  useDocumentTitle("Prepify | Đơn hàng của tôi");

  const [params, setParams] = useSearchParams();
  const tabContents = useMemo(
    () => [
      {
        value: "ALL",
        component: <All />,
      },
      {
        value: OrderStatus.WAITING,
        component: <Waiting />,
      },
      {
        value: OrderStatus.CREATED,
        component: <Created />,
      },
      {
        value: OrderStatus.PICKED_UP,
        component: <PickUp />,
      },
      {
        value: OrderStatus.DELIVERING,
        component: <Delivering />,
      },
      {
        value: OrderStatus.DELIVERED,
        component: <Delivered />,
      },
      {
        value: OrderStatus.CANCELED,
        component: <Canceled />,
      },
      {
        value: OrderStatus.DELAYED,
        component: <Delayed />,
      },
    ],
    [],
  );

  useEffect(() => {
    if (!params.has("tab")) {
      setParams({ tab: "ALL" });
    }
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
      <TabsList className="grid grid-cols-8 w-full h-fit bg-white p-0">
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
