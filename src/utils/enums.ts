export enum DeliveryMethodEnum {
  INSTANT = "instant",
  STANDARD = "standard",
}

export enum LevelCook {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum LevelCookText {
  EASY = "Dễ",
  MEDIUM = "Trung bình",
  HARD = "Khó",
}

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SHIPPER = "SHIPPER",
  MODERATOR = "MODERATOR",
}

export enum SortEnum {
  NEWEST = "newest",
  POPULAR = "popular",
  PRICE = "price",
}

export enum OrderByEnum {
  ASC = "ASC",
  DESC = "DESC",
}

export enum MealKitStatus {
  ACTIVE = "Đang mở bán",
  INACTIVE = "Tạm ngưng",
}

export enum UnitEnum {
  INGREDIENT = "ingredient",
  NUTRITION = "nutrition",
  ALL = "all",
}

export enum UnitText {
  INGREDIENT = "Nguyên liệu",
  NUTRITION = "Chất dinh dưỡng",
}

export enum OrderStatus {
  WAITING = "WAITING",
  CREATED = "CREATED", // Đơn hàng đã thanh toán
  PICKED_UP = "PICKED_UP", // Đã giao cho NVC
  DELIVERING = "DELIVERING", // Chờ giao hàng
  DELIVERED = "DELIVERED", // Đánh giá
  CANCELED = "CANCELED",
  DELAYED = "DELAYED",
}

export enum ImageType {
  RECIPE = "recipe",
  USER = "user",
  EXTRASPICE = "extraspice",
  INGREDIENT = "ingredient",
  FEEDBACK = "feedback",
  REPORT = "report",
}

export enum ConfigEnum {
  WorkEndHour = "workEndHour",
  MaxShippingHour = "maxShippingHour",
  ServiceFee = "serviceFee",
}
