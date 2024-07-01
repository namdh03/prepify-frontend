import configs from "~configs";

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
  DISTRICT_MESSAGE: "Vui lòng chọn quận/huyện",
  SPECIFIC_ADDRESS_MESSAGE: "Vui lòng nhập địa chỉ cụ thể",
} as const;

export const IMAGE_MESSAGES = {
  AVATAR_IS_REQUIRED: "Vui lòng chọn ảnh đại diện",
  AVATAR_SIZE: "Kích thước ảnh tối đa là 1MB",
  IMAGE_MUST_BE_JPEG_OR_PNG_AND_NOT_EXCEED_1MB: "Ảnh phải là file JPEG hoặc PNG và không vượt quá 1MB",
  MAX_3_IMAGES: "Tối đa 3 ảnh",
};

export const FEEDBACK_MESSAGES = {
  FEEDBACK_CONTENT_TOO_LONG: "Nội dung đánh giá không được quá 500 ký tự",
};

export const CATEGORY_MESSAGES = {
  CATEGORY_NAME_REQUIRED: "Vui lòng nhập tên phân loại",
  CATEGORY_NAME_TOO_LONG: "Tên phân loại không được quá 50 ký tự",
  CREATE_CATEGORY_SUCCESS: "Tạo phân loại thành công",
  UPDATE_CATEGORY_SUCCESS: "Cập nhật phân loại thành công",
};

export const PAGE = 1;
export const LIMIT = 9;
export const TABLE_LIMIT = 10;

export const PHONE_REGEX = /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

export const GUEST_URLS = [
  configs.routes.login,
  configs.routes.register,
  configs.routes.forgotPassword,
  configs.routes.resetPassword,
  configs.routes.appResetPassword,
];

export const DEFAULT_DEBOUNCE_TIME = 1000;

export const RECIPE_MESSAGES = {
  NAME_REQUIRED: "Vui lòng nhập tên công thức",
  NAME_TOO_LONG: "Tên công thức không được quá 100 ký tự",
  INGREDIENTS_REQUIRED: "Vui lòng nhập nguyên liệu",
  STEPS_REQUIRED: "Vui lòng nhập bước thực hiện",
  TIME_REQUIRED: "Vui lòng nhập thời gian nấu",
  TIME_INVALID: "Thời gian nấu không hợp lệ",
  LEVEL_REQUIRED: "Vui lòng chọn mức độ",
  NUTRITION_REQUIRED: "Vui lòng nhập chất dinh dưỡng",
  CATEGORY_REQUIRED: "Vui lòng chọn danh mục",
  IMAGES_REQUIRED: "Vui lòng chọn ảnh",
  VIDEO_URL_REQUIRED: "Vui lòng nhập link video",
  VIDEO_URL_INVALID: "Link video không hợp lệ",
  AMOUNT_REQUIRED: "Vui lòng nhập số lượng",
  UNIT_REQUIRED: "Vui lòng chọn đơn vị",
  IMAGE_SIZE: "Kích thước ảnh tối đa là 1MB",
  FOOD_STYLE_REQUIRED: "Vui lòng chọn phong cách ẩm thực",
  CREATE_RECIPE_SUCCESS: "Tạo công thành công",
  CREATE_RECIPE_FAILED: "Tạo công thức thất bại",
} as const;
