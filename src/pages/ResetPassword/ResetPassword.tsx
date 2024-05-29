import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import AuthForm from "~/components/common/AuthForm";
import { resetPasswordSchema } from "~/components/common/AuthForm/AuthForm.schema";
import ButtonActionForm from "~/components/common/AuthForm/components/ButtonActionForm";
import { Form } from "~/components/ui/form";
import configs from "~/configs";
import useTeddyAnimation from "~/hooks/useTeddyAnimation";
import { cn } from "~/lib/utils";

import FormItems from "./components/FormItems";

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

const ResetPasswordFormDefaultValues: ResetPasswordFormType = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { RiveComponent, observeInputPassword } = useTeddyAnimation();
  const form = useForm<ResetPasswordFormType>({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: ResetPasswordFormDefaultValues,
  });

  const onSubmit = (data: ResetPasswordFormType) => {
    console.log(data);
  };

  return (
    <AuthForm animation={RiveComponent} title="Đặt lại mật khẩu">
      <div className="w-96 mb-4 font-normal leading-[26px]">
        <p
          className={cn("text-slate-500", {
            "text-destructive": form.formState.errors.password || form.formState.errors.confirmPassword,
          })}
        >
          Phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-3 space-y-6">
          <FormItems form={form} observeInputPassword={observeInputPassword} />

          <div className="relative -top-3">
            <ButtonActionForm
              mainTitle="Đặt lại mật khẩu"
              subTitle="Đã có tài khoản?"
              to={configs.routes.login}
              loading={false}
            />
          </div>
        </form>
      </Form>
    </AuthForm>
  );
};

export default ResetPassword;
