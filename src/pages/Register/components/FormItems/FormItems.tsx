import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ObserveInput } from "~/hooks/useTeddyAnimation";

import { RegisterFormType } from "../../Register";

interface FormItemsProps {
  form: UseFormReturn<RegisterFormType>;
  observeInputText: ObserveInput;
  observeInputEmail: ObserveInput;
  observeInputPassword: ObserveInput;
}

type RegisterObjectType = {
  name: keyof RegisterFormType;
  label: string;
  component: (field: ControllerRenderProps<RegisterFormType, keyof RegisterFormType>) => JSX.Element;
};

const FormItems = memo(({ form, observeInputText, observeInputEmail, observeInputPassword }: FormItemsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const registerFields: RegisterObjectType[] = useMemo(
    () => [
      {
        name: "fullname",
        label: "Họ và tên",
        component: (field) => (
          <Input
            type="text"
            placeholder="Nguyen Van A"
            className="h-10 bg-white"
            observeInput={observeInputText}
            {...field}
          />
        ),
      },
      {
        name: "email",
        label: "Email",
        component: (field) => (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <Input
              type="email"
              placeholder="customer@example.com"
              className="h-10 bg-white"
              observeInput={observeInputEmail}
              {...field}
            />
          </motion.div>
        ),
      },
      {
        name: "phone",
        label: "Tài khoản",
        component: (field) => (
          <Input
            type="tel"
            placeholder="Số điện thoại"
            className="h-10 bg-white"
            observeInput={observeInputText}
            {...field}
          />
        ),
      },
      {
        name: "password",
        label: "Mật khẩu",
        component: (field) => (
          <motion.div
            className="relative"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
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
          </motion.div>
        ),
      },
    ],
    [observeInputEmail, observeInputPassword, observeInputText, showPassword],
  );

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return registerFields.map(({ name, label, component }) => (
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
});

export default FormItems;
