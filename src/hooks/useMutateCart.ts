import { AxiosResponse } from "axios";

import { useQueryClient } from "@tanstack/react-query";

import { GET_CART_QUERY_KEY } from "~apis/cart.api";
import { CartItem, CartResponse } from "~types/cart.type";

const useMutateCart = () => {
  const queryClient = useQueryClient();

  const mutateCart = (cartItem: CartItem) => {
    queryClient.setQueryData([GET_CART_QUERY_KEY], (prevResponse: AxiosResponse<CartResponse>) => {
      const cart = [...prevResponse.data.data];

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === cartItem.id) {
          cart[i] = cartItem;
          break;
        }
      }

      return {
        ...prevResponse,
        data: {
          ...prevResponse.data,
          data: cart,
        },
      };
    });
  };

  return { mutateCart };
};

export default useMutateCart;
