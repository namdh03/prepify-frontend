import { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useLocation } from "react-router-dom";

import icons from "~/assets/icons";
import { Button } from "~/components/ui/button";
import configs from "~/configs";

import ButtonLink from "./components/ButtonLink";

interface AuthFormProps {
  children: ReactNode;
  Animation: (props: ComponentProps<"canvas">) => JSX.Element;
  title: string;
}

// Constants for transition button group login/register
const SLIDE_LEFT = { x: 0 };
const SLIDE_RIGHT = { x: 112 };

const LOGIN_SCREEN_WIDTH = "496px";
const REGISTER_SCREEN_WIDTH = "896px";

const AuthForm = ({ children, Animation, title }: AuthFormProps) => {
  const { pathname } = useLocation();

  return (
    <div className="relative w-screen h-screen bg-auth">
      <div className="fixed top-9 right-24 inline-block h-[50px] bg-white rounded-full transition-colors hover:bg-accent hover:text-accent-foreground">
        <motion.div
          className="absolute top-0 min-w-28 h-full bg-primary rounded-full shadow"
          initial={pathname === configs.routes.register ? SLIDE_LEFT : SLIDE_RIGHT}
          animate={pathname === configs.routes.register ? SLIDE_RIGHT : SLIDE_LEFT}
        />

        <ButtonLink to={configs.routes.login}>Đăng nhập</ButtonLink>
        <ButtonLink to={configs.routes.register}>Đăng ký</ButtonLink>
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-h-[544px] pt-32 px-14 pb-14 bg-neutral-200 rounded-[20px] [box-shadow:0px_7.249px_22.411px_0px_rgba(0,_0,_0,_0.21),_0px_3.016px_9.326px_0px_rgba(0,_0,_0,_0.29)]"
        initial={{
          width: pathname === configs.routes.register ? LOGIN_SCREEN_WIDTH : REGISTER_SCREEN_WIDTH,
        }}
        animate={{
          width: pathname === configs.routes.register ? REGISTER_SCREEN_WIDTH : LOGIN_SCREEN_WIDTH,
        }}
      >
        <motion.div
          className="absolute -top-[172px]"
          initial={{
            left: "50%",
            x: "-50%",
            y: "100%",
            zIndex: -1,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: 0,
            zIndex: 0,
            scale: 1,
            opacity: 1,
          }}
        >
          <Animation className="w-[300px] h-[300px]" />
        </motion.div>
        <h1 className="mb-2 text-zinc-800 text-center text-3xl font-extrabold leading-[1.2]">{title}</h1>
        <div>{children}</div>
        <div className="flex justify-center w-full">
          <Button variant={"outline"} size={"lg"} className="w-96 mt-7">
            <div className="flex justify-center items-center gap-3">
              <FcGoogle size={20} />
              <span className="text-zinc-500 text-base">Tiếp tục với Google</span>
            </div>
          </Button>
        </div>
      </motion.div>

      <motion.div>
        <motion.img
          src={icons.authDecorate}
          alt=""
          className="fixed left-0 bottom-0 w-full select-none"
          initial={{
            transform: pathname === configs.routes.register ? "translateX(0)" : "translateX(-70%)",
          }}
          animate={{
            transform: pathname === configs.routes.register ? "translateX(-70%)" : "translateX(0)",
          }}
        />
        <motion.img
          src={icons.authDecorateFlip}
          alt=""
          className="fixed left-0 bottom-0 w-full select-none"
          initial={{
            transform: pathname === configs.routes.register ? "translateX(97%)" : "translateX(27%)",
          }}
          animate={{
            transform: pathname === configs.routes.register ? "translateX(27%)" : "translateX(97%)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AuthForm;
