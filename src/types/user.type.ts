import { Role } from "~utils/enums";

import { RestrictIngredientType } from "./ingredient.type";
import { SuccessResponse } from "./response.type";
import { TableResponseState } from "./table.type";

export interface UserCustomer {
  id: string;
  restrictIngredients: RestrictIngredientType[];
}

export interface User {
  id: string;
  email: string;
  dateOfBirth: string | null;
  phone: string | null;
  fullname: string;
  address: string | null;
  role: Role;
  image: string | null;
  identityCard: string | null;
  areaId: string | null;
  hasPassword: boolean;
  customer: UserCustomer;
}

export type UserResponse = SuccessResponse<{
  user: User;
}>;

export type GoogleUrlResponse = SuccessResponse<{
  url: string;
}>;

export type VerifyTokenForgotPasswordResponse = SuccessResponse<{
  success: boolean;
}>;

export type TableAccountType = {
  id: string;
  avatar: string;
  fullname: string;
  role: Role;
  area: string;
  phone: string;
  email: string;
  address: string;
};

export type TableAccountResponse = TableResponseState<TableAccountType>;

export type TableAccountFilter = {
  name: string;
  role: string;
  area: string;
};

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateMeBody = {
  fullname: string;
  email: string;
  phone: string;
  areaId: string;
  address: string;
  createIngredientIds: string[];
  removeIngredientIds: string[];
};
