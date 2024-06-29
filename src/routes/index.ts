import { createBrowserRouter, redirect } from "react-router-dom";

import configs from "~configs";

const mainLayoutLazy = async () => ({
  Component: (await import("~layouts/MainLayout")).default,
});

const guestGuardLazy = async () => ({
  Component: (await import("~guards/GuestGuard")).default,
});

const authGuardLazy = async () => ({
  Component: (await import("~guards/AuthGuard")).default,
});

const router = createBrowserRouter([
  {
    lazy: guestGuardLazy,
    children: [
      {
        path: configs.routes.login,
        lazy: async () => ({
          Component: (await import("~pages/Login")).default,
        }),
      },
      {
        path: configs.routes.register,
        lazy: async () => ({
          Component: (await import("~pages/Register")).default,
        }),
      },
      {
        path: configs.routes.forgotPassword,
        lazy: async () => ({
          Component: (await import("~pages/ForgotPassword")).default,
        }),
      },
      {
        lazy: async () => ({
          Component: (await import("~pages/ResetPassword")).default,
        }),
        children: [
          {
            path: configs.routes.resetPassword,
            lazy: async () => ({
              Component: (await import("~pages/ResetPassword")).default,
            }),
          },
        ],
      },
      {
        path: configs.routes.appResetPassword,
        lazy: async () => ({
          Component: (await import("~pages/AppResetPassword")).default,
        }),
      },
    ],
  },
  {
    lazy: mainLayoutLazy,
    children: [
      {
        path: configs.routes.home,
        lazy: async () => ({
          Component: (await import("~pages/Home")).default,
        }),
      },
      {
        lazy: async () => ({
          Component: (await import("~contexts/shop/ShopContext")).ShopProvider,
        }),
        children: [
          {
            path: configs.routes.shop,
            lazy: async () => ({
              Component: (await import("~pages/Shop")).default,
            }),
          },
        ],
      },
      {
        lazy: async () => ({
          Component: (await import("~contexts/recipe-detail/RecipeDetailContext")).RecipeDetailProvider,
        }),
        children: [
          {
            path: configs.routes.recipeDetail,
            lazy: async () => ({
              Component: (await import("~pages/RecipeDetail")).default,
            }),
          },
        ],
      },
    ],
  },
  {
    lazy: authGuardLazy,
    children: [
      {
        lazy: mainLayoutLazy,
        children: [
          {
            path: configs.routes.cart,
            lazy: async () => ({
              Component: (await import("~pages/Cart")).default,
            }),
          },
          {
            lazy: async () => ({
              Component: (await import("~contexts/checkout/CheckoutContext")).CheckoutProvider,
            }),
            children: [
              {
                path: configs.routes.checkout,
                lazy: async () => ({
                  Component: (await import("~pages/Checkout")).default,
                }),
              },
            ],
          },
          {
            path: configs.routes.order,
            lazy: async () => ({
              Component: (await import("~pages/Order")).default,
            }),
          },
        ],
      },
    ],
  },
  {
    path: configs.routes.moderator,
    lazy: async () => ({
      Component: (await import("~layouts/AdminLayout")).default,
    }),
    children: [
      {
        lazy: async () => ({
          Component: (await import("~contexts/recipe/RecipeContext")).RecipeProvider,
        }),
        children: [
          {
            path: configs.routes.createRecipe,
            lazy: async () => ({
              Component: (await import("~pages/CreateRecipe")).default,
            }),
          },
        ],
      },
      {
        path: configs.routes.listRecipe,
        lazy: async () => ({
          Component: (await import("~pages/RecipeList")).default,
        }),
      },
    ],
  },
  {
    path: configs.routes.user,
    lazy: authGuardLazy,
    children: [
      {
        lazy: async () => ({
          Component: (await import("~layouts/UserLayout")).default,
        }),
        children: [
          {
            index: true,
            loader: () => redirect(configs.routes.userProfile),
          },
          {
            path: configs.routes.userProfile,
            lazy: async () => ({
              Component: (await import("~pages/UserProfile")).default,
            }),
          },
          {
            path: configs.routes.userChangePassword,
            lazy: async () => ({
              Component: (await import("~pages/UserChangePassword")).default,
            }),
          },
          {
            path: configs.routes.userPurchase,
            lazy: async () => ({
              Component: (await import("~pages/UserPurchase")).default,
            }),
          },
        ],
      },
    ],
  },
  {
    path: configs.routes[404],
    lazy: async () => ({
      Component: (await import("~pages/NotFound")).default,
    }),
  },
  {
    path: configs.routes.error,
    lazy: async () => ({
      Component: (await import("~pages/NotFound")).default,
    }),
  },
]);

export default router;
