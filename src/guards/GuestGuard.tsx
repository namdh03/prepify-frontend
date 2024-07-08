import { Navigate, Outlet } from "react-router-dom";

import Loading from "~components/common/Loading";
import configs from "~configs";
import useAuth from "~hooks/useAuth";

// GuestGuard is a component that will be used to protect routes
// that should only be accessed by unauthenticated users.
const GuestGuard = () => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) return <Loading />;
  if (isAuthenticated) return <Navigate to={configs.routes.home} replace />;

  return <Outlet />;
};

export default GuestGuard;
