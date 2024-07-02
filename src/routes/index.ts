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
  // Guest routes
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

  // Public routes
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

  // Authenticated routes (User routes)
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

  // Authenticated routes (Flow from cart to order)
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

  // Moderator routes
  {
    path: configs.routes.moderator,
    lazy: async () => ({
      Component: (await import("~layouts/AdminLayout")).default,
    }),
    children: [
      {
        index: true,
        loader: () => redirect(configs.routes.recipeList),
      },
      {
        path: configs.routes.recipeList,
        lazy: async () => ({
          Component: (await import("~pages/RecipeList")).default,
        }),
      },
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
        path: configs.routes.mealKitList,
        lazy: async () => ({
          Component: (await import("~pages/MealKitList")).default,
        }),
      },
      {
        path: configs.routes.createMealKit,
        lazy: async () => ({
          Component: (await import("~pages/CreateMealKit")).default,
        }),
      },
      {
        path: configs.routes.ingredientList,
        lazy: async () => ({
          Component: (await import("~pages/IngredientList")).default,
        }),
      },
      {
        path: configs.routes.createIngredient,
        lazy: async () => ({
          Component: (await import("~pages/CreateIngredient")).default,
        }),
      },
      {
        path: configs.routes.categoryList,
        lazy: async () => ({
          Component: (await import("~pages/CategoryList")).default,
        }),
      },
      {
        path: configs.routes.unitList,
        lazy: async () => ({
          Component: (await import("~pages/UnitList")).default,
        }),
      },
    ],
  },

  // Not found route
  {
    path: configs.routes[404],
    lazy: async () => ({
      Component: (await import("~pages/NotFound")).default,
    }),
  },

  // Error routes
  {
    path: configs.routes.error,
    lazy: async () => ({
      Component: (await import("~pages/NotFound")).default,
    }),
  },
]);

export default router;
