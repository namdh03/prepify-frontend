import { createBrowserRouter } from "react-router-dom";

import routes from "~/configs/routes";
import MainLayout from "~/layouts/MainLayout";
import About from "~/pages/About";
import Home from "~/pages/Home";

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
    ],
  },
]);

export default router;
