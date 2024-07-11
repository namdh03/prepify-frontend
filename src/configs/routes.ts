const routes = {
  home: "/",
  admin: "/admin",
  adminProfile: "/admin/profile",
  accountList: "/admin/account-list",
  createAccount: "/admin/create-account",
  moderator: "/moderator",
  overview: "/moderator/overview",
  createRecipe: "/moderator/create-recipe",
  updateRecipe: "/moderator/update-recipe/:recipeId",
  recipeList: "/moderator/recipe-list",
  createMealKit: "/moderator/create-meal-kit",
  mealKitList: "/moderator/meal-kit-list",
  updateMealKit: "/moderator/update-meal-kit/:recipeId",
  createIngredient: "/moderator/create-ingredient",
  updateIngredient: "/moderator/update-ingredient/:ingredientId",
  ingredientList: "/moderator/ingredient-list",
  categoryList: "/moderator/category-list",
  unitList: "/moderator/unit-list",
  orderList: "/moderator/order-list",
  foodStyleList: "/moderator/food-style-list",
  moderatorSettings: "/moderator/settings",
  login: "/login",
  loginGoogle: "/login/google",
  register: "/register",
  logout: "/logout",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  appResetPassword: "/app/reset-password",
  shop: "/shop",
  cart: "/cart",
  checkout: "/checkout",
  order: "/order",
  recipeDetail: "/shop/:slug",
  purchase: "/purchase",
  user: "/user",
  userProfile: "/user/profile",
  userChangePassword: "/user/change-password",
  userPurchase: "/user/purchase",
  userPurchaseDetail: "/user/purchase/:orderId",
  404: "/404",
  error: "*",
};

export default routes;
