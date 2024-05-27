import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getMe, getMeQueryKey, login } from "~/apis/users.api";
import AuthForm from "~/components/common/AuthForm";
import { loginSchema } from "~/components/common/AuthForm/AuthForm.schema";
import ButtonActionForm from "~/components/common/AuthForm/components/ButtonActionForm";
import { Form } from "~/components/ui/form";
import configs from "~/configs";
import { signIn } from "~/contexts/auth/auth.reducer";
import useAuth from "~/hooks/useAuth";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import useTeddyAnimation from "~/hooks/useTeddyAnimation";
import { AUTH_MESSAGES } from "~/utils/constants";
import { getToken, setToken } from "~/utils/cookies";
import isAxiosError from "~/utils/isAxiosError";

import FormItems from "./components/FormItems";

export type LoginFormType = z.infer<typeof loginSchema>;

const loginFormDefaultValues: LoginFormType = {
  email: "",
  password: "",
};

const Login = () => {
  useDocumentTitle("Prepify | Đăng Nhập");
  const { RiveComponent, observeInputEmail, observeInputPassword, teddySuccess, teddyFail } = useTeddyAnimation();
  const form = useForm<LoginFormType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
  });
  const loginAccount = useMutation({
    mutationFn: (body: LoginFormType) => login(body),
  });
  const { dispatch } = useAuth();
  const { data } = useQuery({
    queryKey: [getMeQueryKey],
    queryFn: () => getMe(),
    enabled: Boolean(getToken()),
  });

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        const user = data.data.data.user;
        dispatch(
          signIn({
            isAuthenticated: true,
            user,
          }),
        );
      }, 2000);
    }
  }, [dispatch, data]);

  const onSubmit = (data: LoginFormType) => {
    if (loginAccount.isPending) return;
    loginAccount.mutate(data, {
      onSuccess: ({ data }) => {
        const accessToken = data.data.access_token;
        setToken(accessToken);

        form.reset();
        toast.success(AUTH_MESSAGES.LOGIN_TITLE_SUCCESS);
        teddySuccess();
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

          <ButtonActionForm
            mainTitle="Đăng nhập"
            subTitle="Quên mật khẩu?"
            to={configs.routes.register}
            loading={loginAccount.isPending}
          />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
