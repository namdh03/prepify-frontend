import { CartItem as CartItemType } from "~types/cart.type";

// Dummy data for cart item
export const cartItem: CartItemType = {
  id: "string",
  recipe: {
    id: "string",
    name: "string",
    slug: "string",
  },
  mealKitSelected: {
    id: "string",
    price: 0,
    serving: 0,
    extraSpice: null,
  },
  quantity: 0,
  image: "string",
  mealKits: [],
};
