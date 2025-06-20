import {useMutation, useQuery} from '@tanstack/react-query';

// Constants
import {API_PATH} from '@/constants';

// Interfaces
import {Cart} from '@/interfaces';

// Services
import {GET, PATCH, POST} from '@/services';

export const useCart = () => {
  const useFetchCarts = () =>
    useQuery({
      queryKey: [API_PATH.CART],
      queryFn: () => GET<Cart[]>(API_PATH.CART),
    });

  const addCart = useMutation({
    mutationFn: (data: Cart) => POST<Cart, Cart>(API_PATH.CART, data),
  });

  const removeCartItem = useMutation({
    mutationFn: ({id}: {id: string}) => PATCH<Cart, {id: string}>(API_PATH.CART, {id}),
  });

  return {useFetchCarts, addCart, removeCartItem};
};
