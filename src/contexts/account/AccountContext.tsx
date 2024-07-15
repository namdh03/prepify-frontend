import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { createAccount } from "~apis/account.api";
import { deleteAvatar, uploadAvatar } from "~apis/user.api";
import { ACCOUNT_MESSAGES, SYSTEM_MESSAGES } from "~utils/constants";
import { Role } from "~utils/enums";
import isAxiosError from "~utils/isAxiosError";

import { accountSchema } from "./account.schema";
import { AccountContextType, AccountFormType } from "./account.type";

const accountFormDefaultValues: AccountFormType = {
  email: "",
  phone: "",
  fullname: "",
  identityCard: "",
  role: Role.SHIPPER,
  image: new File([], ""),
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const AccountProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<AccountFormType>({
    resolver: zodResolver(accountSchema),
    defaultValues: accountFormDefaultValues,
  });

  const { mutateAsync: createMutate } = useMutation({
    mutationFn: (body: AccountFormType) => createAccount(body),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const { mutateAsync: uploadAvatarMutateAsync } = useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => uploadAvatar(id, file),
  });
  const { mutateAsync: deleteAvatarMutateAsync } = useMutation({
    mutationFn: (id: string) => deleteAvatar(id),
  });

  const onSubmit = useCallback(
    async (values: AccountFormType) => {
      setIsLoading(true);
      async function handleUploadAvatar(image: File, id: string) {
        if (!id) return;
        await deleteAvatarMutateAsync(id);
        await uploadAvatarMutateAsync(
          {
            id: id,
            file: image,
          },
          {
            onSuccess: () => {
              toast.success(ACCOUNT_MESSAGES.CREATE_ACCOUNT_SUCCESS);
              setIsLoading(false);
            },
            onError: (error) => {
              if (isAxiosError<Error>(error)) toast.error(error.response?.data.message);
              else toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
            },
          },
        );
      }

      await createMutate(values, {
        onSuccess: (response) => {
          const { id } = response.data.data;
          handleUploadAvatar(values.image, id);
        },
        onError: (error) => {
          if (isAxiosError<Error>(error)) {
            toast.error(error.response?.data.message || ACCOUNT_MESSAGES.CREATE_ACCOUNT_FAILED);
          } else {
            toast.error(ACCOUNT_MESSAGES.CREATE_ACCOUNT_FAILED);
          }
        },
      });
    },
    [createMutate, deleteAvatarMutateAsync, uploadAvatarMutateAsync, setIsLoading],
  );

  return (
    <AccountContext.Provider value={{ form, onSubmit, isLoading, preview, setPreview }}>
      {children || <Outlet />}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };
