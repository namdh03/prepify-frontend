import configs from "~configs";

import { LevelCook, LevelCookText, OrderStatus, Role } from "./enums";

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
  CHANGE_PASSWORD_SUCCESS: "Đổi mật khẩu thành công",
  UPDATE_PROFILE_SUCCESS: "Cập nhật thông tin thành công",
  UPLOAD_AVATAR_SUCCESS: "Cập nhật ảnh thành công",
} as const;

export const IMAGE_MESSAGES = {
  AVATAR_IS_REQUIRED: "Vui lòng chọn ảnh đại diện",
  AVATAR_SIZE: "Kích thước ảnh tối đa là 1MB",
  IMAGE_MUST_BE_JPEG_OR_PNG_AND_NOT_EXCEED_1MB: "Ảnh phải là file JPEG hoặc PNG và không vượt quá 1MB",
  MAX_3_IMAGES: "Tối đa 3 ảnh",
};

export const FEEDBACK_MESSAGES = {
  FEEDBACK_CONTENT_TOO_LONG: "Nội dung đánh giá không được quá 500 ký tự",
  CREATE_FEEDBACK_SUCCESS: "Đánh giá sản phẩm thành công",
};

export const CATEGORY_MESSAGES = {
  CATEGORY_NAME_REQUIRED: "Vui lòng nhập tên phân loại",
  CATEGORY_NAME_TOO_LONG: "Tên phân loại không được quá 50 ký tự",
  CREATE_CATEGORY_SUCCESS: "Tạo phân loại thành công",
  UPDATE_CATEGORY_SUCCESS: "Cập nhật phân loại thành công",
  DELETE_CATEGORY_SUCCESS: "Xóa phân loại thành công",
};

export const UNIT_MESSAGES = {
  UNIT_NAME_REQUIRED: "Vui lòng nhập tên đơn vị",
  UNIT_NAME_TOO_LONG: "Tên đơn vị không được quá 50 ký tự",
  CREATE_UNIT_SUCCESS: "Tạo đơn vị thành công",
  UPDATE_UNIT_SUCCESS: "Cập nhật đơn vị thành công",
  DELETE_UNIT_SUCCESS: "Xóa đơn vị thành công",
  UNIT_TYPE_REQUIRED: "Vui lòng chọn loại đơn vị",
};

export const PAGE = 1;
export const LIMIT = 9;
export const TABLE_LIMIT = 10;

export const PHONE_REGEX = /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
export const FOOD_STYLE_TYPE_REGEX = /\s/;
export const IDENTITY_REGEX = /^[0-9]{12}$/;

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
  DELETE_RECIPE_SUCCESS: "Xóa công thức thành công",
} as const;

export const MEAL_KIT_MESSAGES = {
  TOGGLE_STATUS_MEAL_KIT_SUCCESS_SUSPEND: "Tạm ngừng thành công",
  TOGGLE_STATUS_MEAL_KIT_SUCCESS_RESUME: "Mở bán thành công",
};

export const FOOD_STYLE_MESSAGES = {
  FOOD_STYLE_NAME_REQUIRED: "Vui lòng nhập tên phong cách",
  FOOD_STYLE_NAME_TOO_LONG: "Tên phong cách không được quá 50 ký tự",
  FOOD_STYLE_TITLE_REQUIRED: "Vui lòng nhập tiêu đề",
  FOOD_STYLE_TITLE_TOO_LONG: "Tiêu đề không được quá 50 ký tự",
  FOOD_STYLE_TYPE_REQUIRED: "Vui lòng nhập loại phong cách",
  FOOD_STYLE_TYPE_TOO_LONG: "Loại phong cách không được quá 50 ký tự",
  FOOD_STYLE_TYPE_MUST_NOT_CONTAIN_SPACES: "Loại phong cách không được chứa khoảng trắng",
  CREATE_FOOD_STYLE_SUCCESS: "Tạo phong cách thành công",
  UPDATE_FOOD_STYLE_SUCCESS: "Cập nhật phong cách thành công",
  DELETE_FOOD_STYLE_SUCCESS: "Xóa phong cách thành công",
};

export const LEVEL_COOK_TEXT_MAP = {
  [LevelCook.EASY]: LevelCookText.EASY,
  [LevelCook.MEDIUM]: LevelCookText.MEDIUM,
  [LevelCook.HARD]: LevelCookText.HARD,
};

export const ORDER_STATUS_TEXT_MAP = {
  [OrderStatus.WAITING]: "Chờ thanh toán",
  [OrderStatus.CREATED]: "Đã tạo đơn",
  [OrderStatus.PICKED_UP]: "Đã nhận đơn",
  [OrderStatus.DELIVERING]: "Đang giao hàng",
  [OrderStatus.DELIVERED]: "Đã giao hàng",
  [OrderStatus.CANCELED]: "Đã hủy",
  [OrderStatus.DELAYED]: "Đã hoãn giao",
};

export const ACCOUNT_ROLE_TEXT_MAP = {
  [Role.ADMIN]: "Quản trị viên",
  [Role.MODERATOR]: "Người quản lý",
  [Role.CUSTOMER]: "Khách hàng",
  [Role.SHIPPER]: "Người giao hàng",
};

export const INGREDIENT_MESSAGES = {
  NAME_REQUIRED: "Vui lòng nhập tên nguyên liệu",
  NAME_TOO_LONG: "Tên nguyên liệu không được quá 100 ký tự",
  CATEGORY_REQUIRED: "Vui lòng chọn danh mục",
  CATEGORY_TOO_LONG: "Danh mục không được quá 50 ký tự",
  CREATE_INGREDIENT_SUCCESS: "Tạo nguyên liệu thành công",
  CREATE_INGREDIENT_FAILED: "Tạo nguyên liệu thất bại",
  UPDATE_INGREDIENT_SUCCESS: "Cập nhật nguyên liệu thành công",
  DELETE_INGREDIENT_SUCCESS: "Xóa nguyên liệu thành công",
} as const;

export const SPICES_SIGNATURE = "Spices (Gia vị)";

export const ACCOUNT_MESSAGES = {
  CREATE_ACCOUNT_SUCCESS: "Tạo tài khoản thành công",
  CREATE_ACCOUNT_FAILED: "Tạo tài khoản thất bại",
  IDENTITY_CARD_REQUIRED: "Vui lòng nhập căn cứ nhân dân",
  IDENTITY_CARD_INVALID: "Căn cứ nhân dân không hợp lệ",
  AREA_IS_REQUIRED: "Vui lòng chọn quận, huyện",
  ADDRESS_IS_REQUIRED: "Vui lòng nhập địa chỉ",
} as const;
