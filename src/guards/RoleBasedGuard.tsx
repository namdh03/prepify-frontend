import { FC, ReactNode } from "react";

import useAuth from "~hooks/useAuth";
import NotFound from "~pages/NotFound";
import { Role } from "~utils/enums";

// Role based guard types
interface RoleBasedGuardProps {
  children?: ReactNode;
  accessibleRoles: Role[];
}

// RoleBasedGuard is a component that will be used to protect routes
// that should only be accessed by users with specific roles.
// eslint-disable-next-line react-refresh/only-export-components
const RoleBasedGuard: FC<RoleBasedGuardProps> = ({ children, accessibleRoles }) => {
  const { user } = useAuth();

  if (!accessibleRoles.includes(user!.role)) return <NotFound />;

  return children;
};

// HOC to inject props
const withRoleBasedGuard =
  (accessibleRoles: Role[]) =>
  <P extends object>(Component: FC<P>): FC<P> => {
    const WrappedComponent: FC<P> = (props: P) => (
      <RoleBasedGuard accessibleRoles={accessibleRoles}>
        <Component {...props} />
      </RoleBasedGuard>
    );

    return WrappedComponent;
  };

export { RoleBasedGuard as default, withRoleBasedGuard };
