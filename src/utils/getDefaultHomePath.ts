import configs from "~configs";

import { Role } from "./enums";

const getDefaultHomePath = (role?: Role) => {
  switch (role) {
    case Role.ADMIN:
      return configs.routes.admin;
    case Role.MODERATOR:
      return configs.routes.moderator;
    case Role.CUSTOMER:
      return configs.routes.home;
    default:
      return configs.routes.home;
  }
};

export default getDefaultHomePath;
