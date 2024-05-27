import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getMe, getMeQueryKey, register } from "~/apis/users.api";
import AuthForm from "~/components/common/AuthForm";
import { registerSchema } from "~/components/common/AuthForm/AuthForm.schema";
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

export type RegisterFormType = z.infer<typeof registerSchema>;

const registerFormDefaultValues: RegisterFormType = {
  fullname: "",
  email: "",
  phone: "",
  password: "",
};

const Register = () => {
  useDocumentTitle("Prepify | Đăng Ký");
  const { RiveComponent, observeInputText, observeInputPassword, observeInputEmail, teddySuccess, teddyFail } =
    useTeddyAnimation();
  const form = useForm<RegisterFormType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: registerFormDefaultValues,
  });
  const registerAccount = useMutation({
    mutationFn: (body: RegisterFormType) => register(body),
  });
  const { data } = useQuery({
    queryKey: [getMeQueryKey],
    queryFn: () => getMe(),
    enabled: Boolean(getToken()),
  });
  const { dispatch } = useAuth();

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

  const onSubmit = (values: RegisterFormType) => {
    if (registerAccount.isPending) return;
    registerAccount.mutate(values, {
      onSuccess: ({ data }) => {
        const accessToken = data.data.access_token;
        setToken(accessToken);

        form.reset();
        teddySuccess();
        toast.success(AUTH_MESSAGES.REGISTER_TITLE_SUCCESS);
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) {
          toast.error(error.response?.data.message || AUTH_MESSAGES.REGISTER_TITLE_FAILED);
        } else {
          toast.error(AUTH_MESSAGES.SOMETHING_WENT_WRONG);
        }

        teddyFail();
      },
    });
  };

  return (
    <AuthForm Animation={RiveComponent} title="Đăng ký">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-7">
          <div className="grid grid-cols-[repeat(2,_1fr)] gap-x-4 gap-y-7">
            <FormItems
              form={form}
              observeInputText={observeInputText}
              observeInputEmail={observeInputEmail}
              observeInputPassword={observeInputPassword}
            />
          </div>

          <ButtonActionForm
            mainTitle="Đăng ký"
            subTitle="Đã có tài khoản?"
            to={configs.routes.login}
            loading={registerAccount.isPending}
          />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
