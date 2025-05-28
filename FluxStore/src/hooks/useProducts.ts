import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

// Constants
import {API_PATH, PAGE_SIZE} from '@/constants';

// Interfaces
import {Product} from '@/interfaces';

// Services
import {GET} from '@/services';

export const useProducts = () => {
  const useFetchProducts = (initPageParam: number) => {
    return useInfiniteQuery({
      queryKey: [API_PATH.PRODUCT],
      queryFn: ({pageParam}) => {
        return GET<Product[]>(`${API_PATH.PRODUCT}?page=${pageParam}&limit=${PAGE_SIZE}`);
      },
      initialPageParam: initPageParam,
      getNextPageParam: (lastPage, pages, page) => {
        return lastPage?.length === PAGE_SIZE ? page + 1 : undefined;
      },
    });
  };

  const useProductDetail = (id: string) =>
    useQuery({
      queryKey: [API_PATH.PRODUCT + id],
      queryFn: () => GET<Product>(`${API_PATH.PRODUCT}/${id}`),
      enabled: !!id,
    });

  return {useFetchProducts, useProductDetail};
};
