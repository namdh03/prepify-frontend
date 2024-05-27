import { createBrowserRouter } from "react-router-dom";

import configs from "~/configs";
import GuestGuard from "~/guards/GuestGuard";
import MainLayout from "~/layouts/MainLayout";
import About from "~/pages/About";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Register from "~/pages/Register";

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
      {
        path: configs.routes.login,
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: configs.routes.register,
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
    ],
  },
]);

export default router;
