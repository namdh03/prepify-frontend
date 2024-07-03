import { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~components/ui/tooltip";

interface DataTableTooltipProps {
  message: string;
  children?: ReactNode;
}

const DataTableTooltip = ({ message, children }: DataTableTooltipProps) => {
  return message ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-secondary">{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    children
  );
};

export default DataTableTooltip;
