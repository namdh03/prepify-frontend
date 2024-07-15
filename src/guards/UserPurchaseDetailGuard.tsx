import { Outlet, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_ORDER_DETAIL_QUERY_KEY, GET_ORDER_DETAIL_STALE_TIME, getOrderDetailByOrderId } from "~apis/order.api";
import Loading from "~components/common/Loading";
import useDocumentTitle from "~hooks/useDocumentTitle";
import NotFound from "~pages/NotFound";

// UserPurchaseDetailGuard is a guard component that fetches the order detail data and renders the child components.
const UserPurchaseDetailGuard = () => {
  const { orderId } = useParams();
  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: [GET_ORDER_DETAIL_QUERY_KEY, orderId],
    queryFn: () => getOrderDetailByOrderId(orderId as string),
    enabled: !!orderId,
    select: (data) => data.data.data,
    staleTime: GET_ORDER_DETAIL_STALE_TIME,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useDocumentTitle("Prepify | Chi tiết đơn hàng");

  if (isError) return <NotFound />;
  if (isPending) return <Loading />;

  return isSuccess && <Outlet context={data} />;
};

export default UserPurchaseDetailGuard;
