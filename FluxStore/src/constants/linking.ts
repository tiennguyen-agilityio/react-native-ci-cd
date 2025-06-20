export const PATH_PREFIX = 'fluxstore://';

export const LINKING_URLS = {
  BASE: PATH_PREFIX,
  HOME: `${PATH_PREFIX}home`,
  PRODUCTS: `${PATH_PREFIX}products`,
  PRODUCT_DETAIL: (id: string) => `${PATH_PREFIX}product/${id}`,
};
