import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

import Logo from "~components/common/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Button } from "~components/ui/button";
import configs from "~configs";
import useAuth from "~hooks/useAuth";
import navLinks from "~layouts/MainLayout/data/navLinks";
import { cn } from "~lib/utils";

import Container from "../Container";

const Header = () => {
  const { user } = useAuth();
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => setScrollYValue(latest));

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
              <Link to={configs.routes.cart}>
                <AiOutlineShoppingCart size={32} />
              </Link>

              <Link to={configs.routes.user}>
                <Avatar>
                  <AvatarImage src={user.image || ""} alt={user.fullname} />
                  <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
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
