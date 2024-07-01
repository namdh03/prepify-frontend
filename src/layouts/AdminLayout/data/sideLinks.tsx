import { AiOutlineDashboard, AiOutlineProfile } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { PiFishLight } from "react-icons/pi";

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
    title: "Tổng quan",
    label: "",
    href: configs.routes.overview,
    icon: <AiOutlineDashboard size={18} />,
  },
  {
    title: "Hồ sơ",
    label: "",
    href: configs.routes.overview,
    icon: <AiOutlineProfile size={18} />,
  },
  {
    title: "Quản lí công thức",
    label: "",
    href: "",
    icon: <LuClipboardList size={18} />,
    sub: [
      {
        title: "Danh sách công thức",
        label: "",
        href: configs.routes.recipeList,
        icon: <></>,
      },
      {
        title: "Tạo công thức",
        label: "",
        href: configs.routes.createRecipe,
        icon: <></>,
      },
    ],
  },
  {
    title: "Quản lí meal kit, gói gia vị",
    label: "",
    href: "",
    icon: <BsBoxSeam size={18} />,
    sub: [
      {
        title: "Danh sách gói nguyên liệu",
        label: "",
        href: configs.routes.mealKitList,
        icon: <></>,
      },
      {
        title: "Tạo gói nguyên liệu, gia vị",
        label: "",
        href: configs.routes.createMealKit,
        icon: <></>,
      },
    ],
  },
  {
    title: "Quản lý nguyên liệu",
    label: "",
    href: "",
    icon: <PiFishLight size={18} />,
    sub: [
      {
        title: "Danh sách nguyên liệu",
        label: "",
        href: configs.routes.ingredientList,
        icon: <></>,
      },
      {
        title: "Thêm nguyên liệu",
        label: "",
        href: configs.routes.createIngredient,
        icon: <></>,
      },
    ],
  },
];
