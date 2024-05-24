import { useMemo, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "~/components/common/AuthForm";
import { loginSchema } from "~/components/common/AuthForm/AuthForm.schema";
import ButtonActionForm from "~/components/common/AuthForm/components/ButtonActionForm";
import FormLabel from "~/components/common/AuthForm/components/FormLabel";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import routes from "~/configs/routes";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import useTeddyAnimation from "~/hooks/useTeddyAnimation";

type LoginFieldType = "phone" | "password";

type LoginObjectType = {
  name: LoginFieldType;
  label: string;
  component: (
    field: ControllerRenderProps<
      {
        phone: string;
        password: string;
      },
      LoginFieldType
    >,
  ) => JSX.Element;
};

const Login = () => {
  useDocumentTitle("Prepify | Đăng Nhập");
  const { RiveComponent, observeInputText, observeInputPassword, teddySuccess, teddyFail } = useTeddyAnimation();
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const loginFields: LoginObjectType[] = useMemo(
    () => [
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
    [observeInputPassword, observeInputText, showPassword],
  );

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setTimeout(() => {
      console.log(values);
      values.password === "Password123@" ? teddySuccess() : teddyFail();
    }, 2000);
  }

  return (
    <AuthForm Animation={RiveComponent} title="Welcome back">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-7">
          {loginFields.map(({ name, label, component }) => (
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

          <ButtonActionForm mainTitle="Đăng nhập" subTitle="Quên mật khẩu?" to={routes.register} />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
