import React from "react";

import { cn } from "~lib/utils";

const Spinner = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn("w-5 h-5 border-2 border-t-transparent rounded-full animate-spin", className)}
      {...props}
    ></span>
  );
};

export default Spinner;
