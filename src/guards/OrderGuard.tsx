import { Outlet, useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_VERIFY_PAYMENT_QUERY_KEY, getVerifyPayment } from "~apis/payment.api";
import Loading from "~components/common/Loading";
import useDocumentTitle from "~hooks/useDocumentTitle";
import NotFound from "~pages/NotFound";

// OrderGuard is a guard component that fetches the verify payment data and renders the child components.
const OrderGuard = () => {
  const [params] = useSearchParams();
  const { data, isSuccess, isError, isFetching } = useQuery({
    queryKey: [GET_VERIFY_PAYMENT_QUERY_KEY],
    queryFn: () => getVerifyPayment(params),
    select: (data) => data.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useDocumentTitle(
    isFetching
      ? "Đang xác thực thanh toán..."
      : data?.data.success
        ? "Prepify | Đặt hàng thành công"
        : "Prepify | Đặt hàng thất bại",
  );

  if (isError) return <NotFound />;
  if (isFetching) return <Loading />;

  return isSuccess && <Outlet context={data} />;
};

export default OrderGuard;
