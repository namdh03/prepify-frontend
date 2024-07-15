import { Navigate, Outlet } from "react-router-dom";

import Loading from "~components/common/Loading";
import useAuth from "~hooks/useAuth";
import getDefaultHomePath from "~utils/getDefaultHomePath";

// GuestGuard is a component that will be used to protect routes
// that should only be accessed by unauthenticated users.
const GuestGuard = () => {
  const { isInitialized, isAuthenticated, user } = useAuth();

  if (!isInitialized) return <Loading />;
  if (isAuthenticated) return <Navigate to={getDefaultHomePath(user?.role)} replace />;

  return <Outlet />;
};

export default GuestGuard;
