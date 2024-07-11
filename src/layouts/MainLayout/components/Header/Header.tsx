import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_CART_LENGTH_QUERY_KEY, GET_CART_LENGTH_STALE_TIME, getCartLength } from "~apis/cart.api";
import Logo from "~components/common/Logo";
import { Badge } from "~components/ui/badge";
import { Button } from "~components/ui/button";
import configs from "~configs";
import useAuth from "~hooks/useAuth";
import navLinks from "~layouts/MainLayout/data/navLinks";
import { cn } from "~lib/utils";
import { Role } from "~utils/enums";

import Container from "../Container";
import UserNav from "../UserNav";

const Header = () => {
  const { user } = useAuth();
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => setScrollYValue(latest));
  const { data } = useQuery({
    queryKey: [GET_CART_LENGTH_QUERY_KEY],
    queryFn: () => getCartLength(),
    select: (data) => data.data.data.length,
    staleTime: GET_CART_LENGTH_STALE_TIME,
    enabled: Boolean(user && user.role === Role.CUSTOMER),
    refetchOnWindowFocus: false,
  });

  return (
    <header className={cn("sticky top-0 z-40 w-full transition-all", { "bg-white shadow": scrollYValue > 0 })}>
      <Container>
        <div className="flex items-center pt-5 pb-5">
          <Logo />
          <nav className="flex gap-[100px] ml-auto mr-[100px]">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn("text-lg text-[rgba(0,_0,_0,_0.85)] font-medium leading-4", { "text-primary": isActive })
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {user ? (
            <div className="flex items-center gap-[30px]">
              <Link to={configs.routes.cart} className="w-fit">
                <div className="relative">
                  <AiOutlineShoppingCart size={32} />

                  <Badge className="absolute -top-1 -right-2 p-0 w-5 h-5 flex items-center justify-center rounded-full">
                    {data || 0}
                  </Badge>
                </div>
              </Link>

              <UserNav />
            </div>
          ) : (
            <Link to={configs.routes.login}>
              <Button className="px-7 h-11 leading-11 text-base font-semibold rounded-full">Đăng nhập</Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
