import { FaRegUser } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { TbPasswordMobilePhone } from "react-icons/tb";

import configs from "~configs";

const sidebarNavItems = [
  {
    title: "Hồ sơ của tôi",
    icon: <FaRegUser size={18} />,
    href: configs.routes.userProfile,
  },
  {
    title: "Đổi mật khẩu",
    icon: <TbPasswordMobilePhone size={18} />,
    href: configs.routes.userChangePassword,
  },
  {
    title: "Đơn mua",
    icon: <LuClipboardList size={18} />,
    href: configs.routes.userPurchase,
  },
];

export default sidebarNavItems;
