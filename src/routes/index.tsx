import { createBrowserRouter } from "react-router-dom";

import configs from "~/configs";
import GuestGuard from "~/guards/GuestGuard";
import AdminLayout from "~/layouts/AdminLayout";
import MainLayout from "~/layouts/MainLayout";
import About from "~/pages/About";
import ForgotPassword from "~/pages/ForgotPassword";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import NotFound from "~/pages/NotFound";
import Register from "~/pages/Register";
import ResetPassword from "~/pages/ResetPassword";

const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: configs.routes.login,
        element: <Login />,
      },
      {
        path: configs.routes.register,
        element: <Register />,
      },
      {
        path: configs.routes.forgotPassword,
        element: <ForgotPassword />,
      },
      {
        path: configs.routes.resetPassword,
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: configs.routes.home,
    element: <MainLayout />,
    children: [
      {
        path: configs.routes.home,
        element: <Home />,
      },
      {
        path: configs.routes.about,
        element: <About />,
      },
    ],
  },
  {
    path: configs.routes.admin,
    element: <AdminLayout />,
  },
  {
    path: configs.routes.error,
    element: <NotFound />,
  },
]);

export default router;
