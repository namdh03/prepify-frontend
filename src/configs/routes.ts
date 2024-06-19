const routes = {
  home: "/",
  moderator: "/moderator",
  overview: "/moderator/overview",
  createRecipe: "/moderator/create-recipe",
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
  orders: "/orders",
  recipeDetail: "/shop/:slug",
  error: "*",
};

export default routes;
