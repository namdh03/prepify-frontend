// import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineDashboard, AiOutlineProfile } from "react-icons/ai";
import { LuClipboardList } from "react-icons/lu";
import { TbApps, TbMessages, TbSettings } from "react-icons/tb";

import configs from "~configs";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sideLinks: SideLink[] = [
  {
    title: "Tổng Quan",
    label: "",
    href: configs.routes.overview,
    icon: <AiOutlineDashboard size={18} />,
  },
  {
    title: "Hồ Sơ",
    label: "",
    href: configs.routes.overview,
    icon: <AiOutlineProfile size={18} />,
  },
  {
    title: "Quản Lí Công Thức",
    label: "",
    href: "",
    icon: <LuClipboardList size={18} />,
    sub: [
      {
        title: "Danh Sách Công Thức",
        label: "",
        href: configs.routes.recipeList,
        icon: <></>,
      },
      {
        title: "Tạo Công Thức",
        label: "",
        href: configs.routes.createRecipe,
        icon: <></>,
      },
    ],
  },
  {
    title: "Tạo Gói Nguyên Liệu",
    label: "",
    href: "/apps",
    icon: <TbApps size={18} />,
  },
  {
    title: "Danh Sách Đơn Hàng",
    label: "",
    href: "/chats",
    icon: <TbMessages size={18} />,
  },
  {
    title: "Cài Đặt",
    label: "",
    href: "/settings",
    icon: <TbSettings size={18} />,
  },
];
