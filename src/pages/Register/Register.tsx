import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "~/components/common/AuthForm";
import { registerSchema } from "~/components/common/AuthForm/AuthForm.schema";
import ButtonActionForm from "~/components/common/AuthForm/components/ButtonActionForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import routes from "~/configs/routes";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import useTeddyAnimation from "~/hooks/useTeddyAnimation";

type RegisterFieldType = "fullname" | "email" | "phone" | "password";

type RegisterObjectType = {
  name: RegisterFieldType;
  label: string;
  component: (
    field: ControllerRenderProps<
      {
        fullname: string;
        email: string;
        phone: string;
        password: string;
      },
      RegisterFieldType
    >,
  ) => JSX.Element;
};

const Register = () => {
  useDocumentTitle("Prepify | Đăng Ký");
  const { RiveComponent, observeInputText, observeInputPassword, observeInputEmail, teddySuccess, teddyFail } =
    useTeddyAnimation();
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
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

  function onSubmit(values: z.infer<typeof registerSchema>) {
    setTimeout(() => {
      console.log(values);
      values.password === "Password123@" ? teddySuccess() : teddyFail();
    }, 2000);
  }

  return (
    <AuthForm Animation={RiveComponent} title="Đăng ký">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-7">
          <div className="grid grid-cols-[repeat(2,_1fr)] gap-x-4 gap-y-7">
            {registerFields.map(({ name, label, component }) => (
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
            ))}
          </div>

          <ButtonActionForm mainTitle="Đăng ký" subTitle="Đã có tài khoản?" to={routes.login} />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
