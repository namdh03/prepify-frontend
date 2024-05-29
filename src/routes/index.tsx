import { createBrowserRouter } from "react-router-dom";

import configs from "~/configs";
import GuestGuard from "~/guards/GuestGuard";
import MainLayout from "~/layouts/MainLayout";
import About from "~/pages/About";
import ForgotPassword from "~/pages/ForgotPassword";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import ResetPassword from "~/pages/ResetPassword";

const router = createBrowserRouter([
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
]);

export default router;
