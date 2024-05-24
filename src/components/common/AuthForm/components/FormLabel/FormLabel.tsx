import { ReactNode } from "react";

import { FormLabel as ShadcnFormLabel } from "~/components/ui/form";

interface FormLabelProps {
  children: ReactNode;
}

const FormLabel = ({ children }: FormLabelProps) => {
  return (
    <ShadcnFormLabel>
      <span>{children}</span>
      <span className="ml-1 text-destructive">*</span>
    </ShadcnFormLabel>
  );
};

export default FormLabel;
