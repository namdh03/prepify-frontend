import { Outlet } from "react-router-dom";

import useAuth from "~hooks/useAuth";
import NotFound from "~pages/NotFound";
import { Role } from "~utils/enums";

// CustomerGuard is component that will be used to protect routes that only authenticated users can access.
const CustomerGuard = () => {
  const { user } = useAuth();

  if (user && ![Role.CUSTOMER].includes(user.role)) return <NotFound />;

  return <Outlet />;
};

export default CustomerGuard;
