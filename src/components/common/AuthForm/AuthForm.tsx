import { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useLocation } from "react-router-dom";

import icons from "~/assets/icons";
import { Button } from "~/components/ui/button";
import routes from "~/configs/routes";

import AnimatedText from "../AnimatedText";

import ButtonLink from "./components/ButtonLink";

interface AuthFormProps {
  children: ReactNode;
  Animation: (props: ComponentProps<"canvas">) => JSX.Element;
  title: string;
}

// Constants for transition button group login/register
const SLIDE_LEFT = { x: 0 };
const SLIDE_RIGHT = { x: 112 };

const AuthForm = ({ children, Animation, title }: AuthFormProps) => {
  const { pathname } = useLocation();

  return (
    <div className="relative w-screen h-screen bg-auth">
      <div className="fixed top-11 right-24 inline-block h-[50px] bg-white rounded-full transition-colors hover:bg-accent hover:text-accent-foreground">
        <motion.div
          className="absolute top-0 min-w-28 h-full bg-primary rounded-full shadow"
          initial={pathname === routes.register ? SLIDE_LEFT : SLIDE_RIGHT}
          animate={pathname === routes.register ? SLIDE_RIGHT : SLIDE_LEFT}
        />

        <ButtonLink to={routes.login}>Đăng nhập</ButtonLink>
        <ButtonLink to={routes.register}>Đăng ký</ButtonLink>
      </div>

      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pt-32 px-20 pb-10 bg-neutral-200 rounded-[20px] [box-shadow:0px_7.249px_22.411px_0px_rgba(0,_0,_0,_0.21),_0px_3.016px_9.326px_0px_rgba(0,_0,_0,_0.29)]">
        <Animation className="absolute left-1/2 -translate-x-1/2 -top-[174px] w-[300px] h-[300px]" />
        <AnimatedText
          el="h1"
          text={title}
          className="mb-3 text-zinc-800 text-center text-3xl font-extrabold leading-[1.2]"
        />
        <div>{children}</div>
        <Button variant={"outline"} size={"lg"} className="w-full mt-6">
          <div className="flex justify-center items-center gap-3">
            <FcGoogle size={20} />
            <span className="text-zinc-500 text-base">Login with Google</span>
          </div>
        </Button>
      </div>

      <motion.div>
        <motion.img
          src={icons.authDecorate}
          alt=""
          className="fixed left-0 bottom-0 w-full select-none"
          initial={{
            transform: pathname === routes.register ? "translateX(0)" : "translateX(-50%)",
          }}
          animate={{
            transform: pathname === routes.register ? "translateX(-50%)" : "translateX(0)",
          }}
        />
        <motion.img
          src={icons.authDecorateFlip}
          alt=""
          className="fixed left-0 bottom-0 w-full select-none"
          initial={{
            transform: pathname === routes.register ? "translateX(97%)" : "translateX(47%)",
          }}
          animate={{
            transform: pathname === routes.register ? "translateX(47%)" : "translateX(97%)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AuthForm;
