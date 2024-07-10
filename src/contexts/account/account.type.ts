import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { accountSchema } from "./account.schema";

export type AccountFormType = z.infer<typeof accountSchema>;

export type AccountContextType = {
  form: UseFormReturn<AccountFormType>;
  onSubmit: (values: AccountFormType) => void;
  isLoading: boolean;
  preview: string;
  setPreview: (value: string) => void;
};
