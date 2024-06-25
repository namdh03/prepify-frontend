import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Separator } from "~components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs";

import All from "./components/All";
import Canceled from "./components/Canceled";
import Completed from "./components/Completed";
import Transporting from "./components/Transporting";
import WaitingForDelivery from "./components/WaitingForDelivery";
import WaitingForPay from "./components/WaitingForPay";

enum TabKey {
  All = "all",
  WaitingForPay = "waiting-for-pay",
  Transporting = "transporting",
  WaitingForDelivery = "waiting-for-delivery",
  Completed = "completed",
  Canceled = "canceled",
}

const tabItems = [
  { value: TabKey.All, label: "Tất cả" },
  { value: TabKey.WaitingForPay, label: "Chờ thanh toán" },
  { value: TabKey.Transporting, label: "Vận chuyển" },
  { value: TabKey.WaitingForDelivery, label: "Chờ giao hàng" },
  { value: TabKey.Completed, label: "Hoàn thành" },
  { value: TabKey.Canceled, label: "Đã huỷ" },
];

const UserPurchase = () => {
  const [params, setParams] = useSearchParams();
  const tabContents = useMemo(
    () => [
      {
        value: TabKey.All,
        component: <All />,
      },
      {
        value: TabKey.WaitingForPay,
        component: <WaitingForPay />,
      },
      {
        value: TabKey.Transporting,
        component: <Transporting />,
      },
      {
        value: TabKey.WaitingForDelivery,
        component: <WaitingForDelivery />,
      },
      {
        value: TabKey.Completed,
        component: <Completed />,
      },
      {
        value: TabKey.Canceled,
        component: <Canceled />,
      },
    ],
    [],
  );

  useEffect(() => {
    if (!params.has("tab")) {
      setParams({ tab: TabKey.All });
    }
  }, [params, setParams]);

  const getDefaultValue = useCallback(() => {
    const tab = tabItems.find((item) => item.value === params.get("tab"));
    return tab ? tab.value : TabKey.All;
  }, [params]);

  const handleTabChange = useCallback(
    (value: string) => {
      setParams({ tab: value });
    },
    [setParams],
  );

  return (
    <Tabs defaultValue={getDefaultValue()}>
      <TabsList className="grid w-full grid-cols-6 h-fit bg-white">
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
