import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import InputPassword from "~components/common/InputPassword";
import { Button } from "~components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Separator } from "~components/ui/separator";
import useDocumentTitle from "~hooks/useDocumentTitle";

import userChangePasswordSchema from "./data/schema";

type UserChangePasswordFormType = z.infer<typeof userChangePasswordSchema>;

const UserChangePassword = () => {
  useDocumentTitle("Prepify | Đổi mật khẩu");

  const form = useForm<UserChangePasswordFormType>({
    mode: "onBlur",
    resolver: zodResolver(userChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newConfirmPassword: "",
    },
  });

  const onSubmit = (values: UserChangePasswordFormType) => {
    console.log(values);
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
                name="currentPassword"
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
          <Button form="change-password-form">Lưu thay đổi</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserChangePassword;
