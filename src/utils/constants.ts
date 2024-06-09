export const SYSTEM_MESSAGES = {
  SOMETHING_WENT_WRONG: "Đã có lỗi xảy ra",
} as const;

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
} as const;

export const AUTH_MESSAGES = {
  REGISTER_TITLE_SUCCESS: "Đăng ký thành công",
  REGISTER_TITLE_FAILED: "Đăng ký thất bại",
  LOGIN_TITLE_SUCCESS: "Đăng nhập thành công",
  LOGIN_TITLE_FAILED: "Đăng nhập thất bại",
} as const;

export const USER_MESSAGES = {
  FULLNAME_MESSAGE: "Vui lòng nhập ít nhất 1 kí tự",
  EMAIL_MESSAGE: "Vui lòng nhập email hợp lệ",
  PHONE_MESSAGE: "Vui lòng nhập số điện thoại hợp lệ",
  PASSWORD_MESSAGE: "Mật khẩu phải từ 8 đến 16 ký tự, bao gồm một số, một chữ cái viết hoa và một chữ cái viết thường",
  PASSWORD_CONFIRM_MESSAGE: "Mật khẩu không khớp",
  FORGOT_PASSWORD_SUCCESS: "Vui lòng kiểm tra email của bạn",
  FORGOT_PASSWORD_FAILED: "Không thể gửi email đặt lại mật khẩu",
  RESET_PASSWORD_SUCCESS: "Đặt lại mật khẩu thành công",
  RESET_PASSWORD_FAILED: "Không thể đặt lại mật khẩu",
  ADDRESS_MESSAGE: "Hệ thống chỉ hỗ trợ nhập địa chỉ tại TP. Hồ Chí Minh",
} as const;

export enum SortEnum {
  NEWEST = "newest",
  POPULAR = "popular",
  PRICE = "price",
}

export enum OrderByEnum {
  ASC = "asc",
  DESC = "desc",
}

export const PAGE = 1;
export const LIMIT = 9;

export const PHONE_REGEX = /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

export enum DELIVERY_METHOD {
  FAST = "fast",
  STANDARD = "standard",
}

export enum PAYMENT_METHOD {
  VNPAY = "vnpay",
}
