import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { register } from "~/apis/users.api";
import AuthForm from "~/components/common/AuthForm";
import { registerSchema } from "~/components/common/AuthForm/AuthForm.schema";
import ButtonActionForm from "~/components/common/AuthForm/components/ButtonActionForm";
import { Form } from "~/components/ui/form";
import routes from "~/configs/routes";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import useTeddyAnimation from "~/hooks/useTeddyAnimation";
import { Error } from "~/types/error.type";
import { AUTH_MESSAGES } from "~/utils/constants";
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
  const navigate = useNavigate();
  const { RiveComponent, observeInputText, observeInputPassword, observeInputEmail, teddySuccess, teddyFail } =
    useTeddyAnimation();
  const form = useForm<RegisterFormType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: registerFormDefaultValues,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (body: RegisterFormType) => register(body),
  });

  const onSubmit = (data: RegisterFormType) => {
    if (isPending) return;
    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success(AUTH_MESSAGES.REGISTER_TITLE_SUCCESS);
        teddySuccess();

        setTimeout(() => navigate(routes.home), 2000);
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

          <ButtonActionForm mainTitle="Đăng ký" subTitle="Đã có tài khoản?" to={routes.login} loading={isPending} />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
