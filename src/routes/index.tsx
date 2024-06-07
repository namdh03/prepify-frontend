import { createBrowserRouter } from "react-router-dom";

import configs from "~configs";
import { ShopProvider } from "~contexts/shop/ShopContext";
import AuthGuard from "~guards/AuthGuard";
import GuestGuard from "~guards/GuestGuard";
import ResetPasswordGuard from "~guards/ResetPasswordGuard";
import AdminLayout from "~layouts/AdminLayout";
import MainLayout from "~layouts/MainLayout";
import Cart from "~pages/Cart";
import CreateRecipe from "~pages/CreateRecipe";
import ForgotPassword from "~pages/ForgotPassword";
import Home from "~pages/Home";
import Login from "~pages/Login";
import NotFound from "~pages/NotFound";
import Register from "~pages/Register";
import ResetPassword from "~pages/ResetPassword";
import Shop from "~pages/Shop";

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
        element: (
          <ResetPasswordGuard>
            <ResetPassword />
          </ResetPasswordGuard>
        ),
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
        path: configs.routes.shop,
        element: (
          <ShopProvider>
            <Shop />
          </ShopProvider>
        ),
      },
    ],
  },
  {
    path: configs.routes.cart,
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: configs.routes.cart,
        element: <Cart />,
      },
    ],
  },
  {
    path: configs.routes.moderator,
    element: <AdminLayout />,
    children: [
      {
        path: configs.routes.createRecipe,
        element: <CreateRecipe />,
      },
    ],
  },
  {
    path: configs.routes.error,
    element: <NotFound />,
  },
]);

export default router;
