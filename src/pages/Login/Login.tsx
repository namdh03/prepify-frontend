import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { login } from "~/apis/users.api";
import AuthForm from "~/components/common/AuthForm";
import { loginSchema } from "~/components/common/AuthForm/AuthForm.schema";
import ButtonActionForm from "~/components/common/AuthForm/components/ButtonActionForm";
import { Form } from "~/components/ui/form";
import routes from "~/configs/routes";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import useTeddyAnimation from "~/hooks/useTeddyAnimation";
import { Error } from "~/types/error.type";
import { AUTH_MESSAGES } from "~/utils/constants";
import isAxiosError from "~/utils/isAxiosError";

import FormItems from "./components/FormItems";

export type LoginFormType = z.infer<typeof loginSchema>;

const loginFormDefaultValues: LoginFormType = {
  email: "",
  password: "",
};

const Login = () => {
  useDocumentTitle("Prepify | Đăng Nhập");
  const navigate = useNavigate();
  const { RiveComponent, observeInputEmail, observeInputPassword, teddySuccess, teddyFail } = useTeddyAnimation();
  const form = useForm<LoginFormType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (body: LoginFormType) => login(body),
  });

  const onSubmit = (data: LoginFormType) => {
    if (isPending) return;
    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success(AUTH_MESSAGES.LOGIN_TITLE_SUCCESS);
        teddySuccess();

        setTimeout(() => navigate(routes.home), 2000);
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) {
          toast.error(error.response?.data.message || AUTH_MESSAGES.LOGIN_TITLE_FAILED);
        } else {
          toast.error(AUTH_MESSAGES.SOMETHING_WENT_WRONG);
        }

        teddyFail();
      },
    });
  };

  return (
    <AuthForm Animation={RiveComponent} title="Welcome back">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-7">
          <FormItems form={form} observeInputEmail={observeInputEmail} observeInputPassword={observeInputPassword} />

          <ButtonActionForm mainTitle="Đăng nhập" subTitle="Quên mật khẩu?" to={routes.register} loading={isPending} />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
