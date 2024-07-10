import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAvatar, GET_ME_QUERY_KEY, uploadAvatar } from "~apis/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { Button } from "~components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import { Input } from "~components/ui/input";
import useAuth from "~hooks/useAuth";
import { uploadAvatarSchema } from "~pages/UserProfile/data/schema";
import { SYSTEM_MESSAGES, USER_MESSAGES } from "~utils/constants";
import getImageData from "~utils/getImageData";
import isAxiosError from "~utils/isAxiosError";

type UploadAvatarFormType = z.infer<typeof uploadAvatarSchema>;

export default function Upload() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [preview, setPreview] = useState("");
  const form = useForm<UploadAvatarFormType>({
    mode: "onSubmit",
    resolver: zodResolver(uploadAvatarSchema),
  });
  const { mutateAsync: uploadAvatarMutateAsync } = useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => uploadAvatar(id, file),
  });
  const { mutateAsync: deleteAvatarMutateAsync } = useMutation({
    mutationFn: () => deleteAvatar(user?.id ?? ""),
  });

  async function handleUploadAvatar(values: UploadAvatarFormType) {
    if (!user) return;
    await deleteAvatarMutateAsync();
    await uploadAvatarMutateAsync(
      {
        id: user.id,
        file: values.image,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [GET_ME_QUERY_KEY] });
          toast.success(USER_MESSAGES.UPLOAD_AVATAR_SUCCESS);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
          else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        },
        onSettled: () => {
          form.reset();
          setPreview("");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center mt-[100px] space-y-8"
        onSubmit={form.handleSubmit(handleUploadAvatar)}
      >
        <Avatar className="w-40 h-40">
          <AvatarImage src={preview || (user?.image ?? "")} className="object-cover" />
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
