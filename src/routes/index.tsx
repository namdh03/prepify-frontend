import { createBrowserRouter } from "react-router-dom";

import routes from "~/configs/routes";
import MainLayout from "~/layouts/MainLayout";
import About from "~/pages/About";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Register from "~/pages/Register";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <MainLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.about,
        element: <About />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.register,
        element: <Register />,
      },
    ],
  },
]);

export default router;
