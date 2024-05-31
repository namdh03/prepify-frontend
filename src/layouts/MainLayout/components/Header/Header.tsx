import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { getMeQueryKey } from "~/apis/users.api";
import Logo from "~/components/common/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import configs from "~/configs";
import { signOut } from "~/contexts/auth/auth.reducer";
import useAuth from "~/hooks/useAuth";
import { cn } from "~/lib/utils";

import Button from "../Button";
import Container from "../Container";

const navbar = [
  {
    title: "Trang chủ",
    to: configs.routes.home,
  },
  {
    title: "Cửa hàng",
    to: configs.routes.shop,
  },
  {
    title: "Đơn hàng của tôi",
    to: configs.routes.orders,
  },
];

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch(signOut());
    queryClient.removeQueries({
      queryKey: [getMeQueryKey],
    });
    navigate(configs.routes.login);
  };

  return (
    <header className="sticky -top-3 z-40 w-full bg-white">
      <Container>
        <div className="flex items-center pt-7 pb-4">
          <Logo />
          <nav className="flex gap-[100px] ml-auto mr-[100px]">
            {navbar.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn("text-lg text-[rgba(0,_0,_0,_0.85)] font-medium leading-4", {
                    "text-primary": isActive,
                  })
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {user ? (
            <div className="flex items-center gap-[30px]">
              <Link to={configs.routes.cart}>
                <AiOutlineShoppingCart size={32} />
              </Link>

              <Avatar onClick={handleLogout}>
                <AvatarImage src={user.avatar || ""} alt={user.fullname} />
                <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Link to={configs.routes.login}>
              <Button>Đăng nhập</Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
