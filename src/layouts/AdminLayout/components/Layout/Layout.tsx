import * as React from "react";

import { Separator } from "~components/ui/separator";
import { cn } from "~lib/utils";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fadedBelow?: boolean;
  fixedHeight?: boolean;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, fadedBelow = false, fixedHeight = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-screen w-full flex-col",
        fadedBelow &&
          "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-32 after:w-full after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block",
        fixedHeight && "md:h-svh",
        className,
      )}
      {...props}
    />
  ),
);
Layout.displayName = "Layout";

const LayoutHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <>
      <div
        ref={ref}
        className={cn(
          "h-[var(--header-height)] bg-background p-4 md:px-8 sticky top-0 left-0 w-full z-10 shadow-sm",
          className,
        )}
        {...props}
      />
      <Separator />
    </>
  ),
);
LayoutHeader.displayName = "LayoutHeader";

interface LayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  fixedHeight?: boolean;
}

const LayoutBody = React.forwardRef<HTMLDivElement, LayoutBodyProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1  px-4 py-6 md:px-8 h-screen", className)} {...props} />
));
LayoutBody.displayName = "LayoutBody";

export { Layout, LayoutBody, LayoutHeader };
