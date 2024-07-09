import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { changePassword } from "~apis/user.api";
import InputPassword from "~components/common/InputPassword";
import Spinner from "~components/common/Spinner";
import { Button } from "~components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Separator } from "~components/ui/separator";
import useDocumentTitle from "~hooks/useDocumentTitle";
import { ChangePasswordBody } from "~types/user.type";
import { SYSTEM_MESSAGES, USER_MESSAGES } from "~utils/constants";
import isAxiosError from "~utils/isAxiosError";

import userChangePasswordSchema from "./data/schema";

type UserChangePasswordFormType = z.infer<typeof userChangePasswordSchema>;

const UserChangePassword = () => {
  useDocumentTitle("Prepify | Đổi mật khẩu");
  const { mutate, isPending } = useMutation({
    mutationFn: (body: ChangePasswordBody) => changePassword(body),
  });

  const form = useForm<UserChangePasswordFormType>({
    mode: "onBlur",
    resolver: zodResolver(userChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newConfirmPassword: "",
    },
  });

  const onSubmit = (values: UserChangePasswordFormType) => {
    mutate(
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success(USER_MESSAGES.CHANGE_PASSWORD_SUCCESS);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
          else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
      },
    );
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-medium">Đổi mật khẩu</h3>
        <p className="text-sm text-muted-foreground">Quản lý mật khẩu để đảm bảo sự bảo mật cho tài khoản của bạn</p>
      </div>
      <Separator className="my-4" />

      <Card>
        <CardHeader>
          <CardTitle>Mật khẩu</CardTitle>
          <CardDescription>Sau khi thay đổi mật khẩu, bạn sẽ cần đăng nhập lại với mật khẩu mới</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" id="change-password-form">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu hiện tại</FormLabel>
                    <FormControl>
                      <InputPassword placeholder="******" field={{ ...field }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <InputPassword placeholder="******" field={{ ...field }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newConfirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                    <FormControl>
                      <InputPassword placeholder="******" field={{ ...field }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button form="change-password-form" className="min-w-32">
            {isPending ? <Spinner /> : "Lưu thay đổi"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserChangePassword;
