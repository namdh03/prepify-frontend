import { BiLoaderAlt } from "react-icons/bi";
import { IconBaseProps } from "react-icons/lib";

import { cn } from "~lib/utils";

const Spinner = ({ size = 24, className, ...props }: IconBaseProps) => {
  return <BiLoaderAlt size={size} className={cn("animate-spin", className)} {...props} />;
};

export default Spinner;
