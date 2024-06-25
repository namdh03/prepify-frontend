import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Button } from "~components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import useAuth from "~hooks/useAuth";
import { uploadAvatarSchema } from "~pages/UserProfile/data/schema";
import getImageData from "~utils/getImageData";

type UploadAvatarFormType = z.infer<typeof uploadAvatarSchema>;

export default function Upload() {
  const { user } = useAuth();
  const [preview, setPreview] = useState("");
  const form = useForm<UploadAvatarFormType>({
    mode: "onSubmit",
    resolver: zodResolver(uploadAvatarSchema),
  });

  function handleUploadAvatar(values: UploadAvatarFormType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center mt-[100px] space-y-8"
        onSubmit={form.handleSubmit(handleUploadAvatar)}
      >
        <Avatar className="w-40 h-40">
          <AvatarImage src={preview || (user?.avatar ?? "")} className="object-cover" />
          <AvatarFallback className="text-2xl">{user?.fullname.charAt(0) || "N/A"}</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormMessage />
              <Button type="button" className="w-full p-0">
                <FormLabel className="flex items-center justify-center px-6 w-full text-white">
                  Cập nhật ảnh đại diện
                </FormLabel>
              </Button>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  value={undefined}
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    setPreview(displayUrl);
                    field.onChange(files[0]);
                    form.handleSubmit(handleUploadAvatar)();
                  }}
                  className="hidden"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem>
          <FormDescription>Dung lượng file tối đa 1 MB</FormDescription>
          <FormDescription>Định dạng:.JPEG, .PNG</FormDescription>
        </FormItem>
      </form>
    </Form>
  );
}
