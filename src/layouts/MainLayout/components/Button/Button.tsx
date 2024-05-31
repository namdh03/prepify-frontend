import { FC, PropsWithChildren } from "react";

import { Button as ButtonShadcn } from "~/components/ui/button";

const Button: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ButtonShadcn className="px-9 h-[60px] text-xl font-semibold leading-[60px] rounded-full">{children}</ButtonShadcn>
  );
};

export default Button;
