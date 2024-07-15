import configs from "~configs";
import { BreadCrumbItem } from "~layouts/MainLayout/components/Banner/Banner";

const breadcrumbs: BreadCrumbItem[] = [
  {
    to: configs.routes.home,
    title: "Trang chủ",
  },
  {
    to: configs.routes.shop,
    title: "Cửa hàng",
  },
];

export default breadcrumbs;
