import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { GET_ME_QUERY_KEY } from "~apis/users.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~components/ui/select";
import configs from "~configs";
import { signOut } from "~contexts/auth/auth.reducer";
import useAuth from "~hooks/useAuth";
import { buttonVariants } from "~layouts/AdminLayout/components/Button";
import { cn } from "~lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: JSX.Element;
  }[];
}

export default function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { dispatch } = useAuth();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [val, setVal] = useState(pathname ?? "/settings");

  const handleSelect = (e: string) => {
    setVal(e);
    navigate(e);
  };

  const handleLogout = () => {
    dispatch(signOut());
    queryClient.removeQueries({
      queryKey: [GET_ME_QUERY_KEY],
    });
    navigate(configs.routes.login);
  };

  return (
    <>
      <div className="p-1 md:hidden">
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className="h-12 sm:w-48">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex gap-x-4 px-2 py-1">
                  <span className="scale-125">{item.icon}</span>
                  <span className="text-md">{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden w-full h-full overflow-x-auto bg-background px-1 py-2 md:flex md:flex-col">
        <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
                "justify-start",
              )}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>

        <span
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start cursor-pointer hover:bg-transparent hover:underline",
          )}
          onClick={handleLogout}
        >
          <span className="mr-2">
            <AiOutlineLogout size={18} />
          </span>
          Đăng xuất
        </span>
      </div>
    </>
  );
}
