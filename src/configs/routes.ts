const routes = {
  home: "/",
  moderator: "/moderator",
  overview: "/moderator/overview",
  createRecipe: "/moderator/create-recipe",
  recipeList: "/moderator/recipe-list",
  createMealKit: "/moderator/create-meal-kit",
  mealKitList: "/moderator/meal-kit-list",
  createIngredient: "/moderator/create-ingredient",
  ingredientList: "/moderator/ingredient-list",
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
  404: "/404",
  error: "*",
};

export default routes;
