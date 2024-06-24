import configs from "~configs";
import { BreadCrumbItem } from "~layouts/MainLayout/components/Banner/Banner";

const breadcrumbs: BreadCrumbItem[] = [
  {
    to: configs.routes.home,
    title: "Trang chủ",
  },
  {
    to: configs.routes.checkout,
    title: "Thanh toán",
  },
];

export default breadcrumbs;
