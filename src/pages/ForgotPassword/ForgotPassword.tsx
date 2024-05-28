import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "~/components/common/AuthForm";
import { forgotPasswordSchema } from "~/components/common/AuthForm/AuthForm.schema";
import ButtonActionForm from "~/components/common/AuthForm/components/ButtonActionForm";
import { Form } from "~/components/ui/form";
import configs from "~/configs";
import useCountdown from "~/hooks/useCountdown";
import useTeddyAnimation from "~/hooks/useTeddyAnimation";

import FormItems from "./components/FormItems";

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

const forgotPasswordFormDefaultValues: ForgotPasswordFormType = {
  email: "",
};

const ForgotPassword = () => {
  const [count, { startCountdown }] = useCountdown({ countStart: 60 });

  const { RiveComponent, observeInputText } = useTeddyAnimation();
  const form = useForm<ForgotPasswordFormType>({
    mode: "all",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordFormDefaultValues,
  });

  const onSubmit = (data: ForgotPasswordFormType) => {
    console.log(data);
    startCountdown();
  };

  return (
    <AuthForm animation={RiveComponent} title="Quên mật khẩu ?">
      <div className="w-96 mb-4 font-normal leading-[26px]">
        <p className="mb-1 text-slate-500">Nhập email của bạn bên dưới để nhận hướng dẫn đặt lại mật khẩu.</p>
        <p className="text-sm text-[rgba(0,_0,_0,_0.45)]">Không nhận được hướng dẫn? Hãy thử lại sau {count} giây</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-6 space-y-3">
          <FormItems form={form} observeInputEmail={observeInputText} />

          <ButtonActionForm
            mainTitle="Lấy lại mật khẩu"
            subTitle="Đã có tài khoản?"
            to={configs.routes.login}
            loading={false}
          />
        </form>
      </Form>
    </AuthForm>
  );
};

export default ForgotPassword;
