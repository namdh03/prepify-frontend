import { z } from "zod";

// regex phone: ^(0|\+?84)(3|5|7|8|9)[0-9]{8}$

const PHONE_REGEX = /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const PHONE_MESSAGE = "Vui lòng nhập số điện thoại hợp lệ";
const PASSWORD_MESSAGE =
  "Mật khẩu phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường";

export const loginSchema = z.object({
  phone: z
    .string({
      message: PHONE_MESSAGE,
    })
    .refine((value) => PHONE_REGEX.test(value), {
      message: PHONE_MESSAGE,
    }),
  password: z
    .string({
      message: PASSWORD_MESSAGE,
    })
    .refine((value) => PASSWORD_REGEX.test(value), {
      message: PASSWORD_MESSAGE,
    }),
});
