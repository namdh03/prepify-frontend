import { Navigate, useSearchParams } from "react-router-dom";

import configs from "~configs";

const AppResetPassword = () => {
  const [params] = useSearchParams();
  return <Navigate to={`${configs.routes.resetPassword}?token=${params.get("token")}`} />;
};

export default AppResetPassword;
