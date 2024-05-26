import { useMemo, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ObserveInput } from "~/hooks/useTeddyAnimation";

import { LoginFormType } from "../../Login";

interface FormItemsProps {
  form: UseFormReturn<LoginFormType>;
  observeInputEmail: ObserveInput;
  observeInputPassword: ObserveInput;
}

type LoginObjectType = {
  name: keyof LoginFormType;
  label: string;
  component: (field: ControllerRenderProps<LoginFormType, keyof LoginFormType>) => JSX.Element;
};

const FormItems = ({ form, observeInputEmail, observeInputPassword }: FormItemsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const loginFields: LoginObjectType[] = useMemo(
    () => [
      {
        name: "email",
        label: "Tài khoản",
        component: (field) => (
          <Input
            type="email"
            placeholder="customer@example.com"
            className="h-10 bg-white"
            observeInput={observeInputEmail}
            {...field}
          />
        ),
      },
      {
        name: "password",
        label: "Mật khẩu",
        component: (field) => (
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="h-10 bg-white"
              observeInput={observeInputPassword}
              {...field}
            />
            {showPassword ? (
              <FaRegEye
                size={18}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleTogglePassword}
              />
            ) : (
              <FaRegEyeSlash
                size={18}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleTogglePassword}
              />
            )}
          </div>
        ),
      },
    ],
    [observeInputEmail, observeInputPassword, showPassword],
  );

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return loginFields.map(({ name, label, component }) => (
    <FormField
      control={form.control}
      key={name}
      name={name}
      render={({ field }) => (
        <FormItem className="w-96">
          <FormLabel>{label}</FormLabel>
          <FormControl>{component(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
};

export default FormItems;
