import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "~hooks/useAuth";
import NotFound from "~pages/NotFound";
import { Role } from "~types/user.type";

// Role based guard types
interface RoleBasedGuardProps {
  children: ReactNode;
  accessibleRoles: Role[];
}

// RoleBasedGuard is a component that will be used to protect routes
// that should only be accessed by users with specific roles.
const RoleBasedGuard: FC<RoleBasedGuardProps> = ({ children, accessibleRoles }) => {
  const { user } = useAuth();

  if (!accessibleRoles.includes(user!.role)) return <NotFound />;

  return children || <Outlet />;
};

export default RoleBasedGuard;
