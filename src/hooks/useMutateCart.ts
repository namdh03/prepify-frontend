import { AxiosResponse } from "axios";

import { useQueryClient } from "@tanstack/react-query";

import { GET_CART_QUERY_KEY } from "~apis/cart.api";
import { CartItem, CartResponse } from "~types/cart.type";

const useMutateCart = () => {
  const queryClient = useQueryClient();

  const updateCartItem = (cartItem: CartItem) => {
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

  const deleteCartItem = (cartItemId: string) => {
    queryClient.setQueryData([GET_CART_QUERY_KEY], (prevResponse: AxiosResponse<CartResponse>) => {
      const cart = prevResponse.data.data.filter((item) => item.id !== cartItemId);

      return {
        ...prevResponse,
        data: {
          ...prevResponse.data,
          data: cart,
        },
      };
    });
  };

  const deleteManyCartItems = (cartItemIds: string[]) => {
    queryClient.setQueryData([GET_CART_QUERY_KEY], (prevResponse: AxiosResponse<CartResponse>) => {
      const cart = prevResponse.data.data.filter((item) => !cartItemIds.includes(item.id));

      return {
        ...prevResponse,
        data: {
          ...prevResponse.data,
          data: cart,
        },
      };
    });
  };

  const deleteCart = () => {
    queryClient.setQueryData([GET_CART_QUERY_KEY], (prevResponse: AxiosResponse<CartResponse>) => {
      return {
        ...prevResponse,
        data: {
          ...prevResponse.data,
          data: [],
        },
      };
    });
  };

  return { updateCartItem, deleteCartItem, deleteManyCartItems, deleteCart };
};

export default useMutateCart;
