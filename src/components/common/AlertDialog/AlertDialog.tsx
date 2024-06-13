import { ReactNode } from "react";

import {
  AlertDialog as AlertDialogShadcn,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~components/ui/alert-dialog";

interface AlertDialogProps {
  title?: string;
  description?: ReactNode | string;
  cancelText?: string;
  actionText?: string;
  trigger?: ReactNode;
  className?: string;
  onAction?: () => void;
  reverse?: boolean;
}

const AlertDialog = ({
  title,
  description,
  cancelText,
  actionText,
  trigger,
  className,
  reverse,
  onAction,
}: AlertDialogProps) => {
  return (
    <AlertDialogShadcn>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {reverse ? (
            <>
              <AlertDialogAction>TRỞ LẠI</AlertDialogAction>
              <AlertDialogCancel onClick={onAction}>CÓ</AlertDialogCancel>
            </>
          ) : (
            <>
              <AlertDialogCancel>{cancelText}</AlertDialogCancel>
              <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogShadcn>
  );
};

export default AlertDialog;
