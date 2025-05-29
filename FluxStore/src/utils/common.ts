import {Cart} from '@/interfaces';

export const formatAmount = (number: number) => {
  if (number) {
    if (Number.isInteger(number)) {
      return number.toLocaleString('en-US');
    } else {
      return number.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    }
  }
  return 0;
};

export const toggleItem = (array: string[], item: string): string[] => {
  const index = array.indexOf(item);
  if (index !== -1) {
    return array.filter((_, i) => i !== index);
  } else {
    return [...array, item];
  }
};

export const getData = <T>(pages = []) => {
  let result: T[] = [];

  pages?.map(item => {
    result = result.concat(item);
  });

  return result;
};

export const getQueryString = (filters: object = {}): string =>
  Object.entries(filters)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(typeof v === 'string' ? v.trim() : v)}`,
    )
    .join('&');

export const calcTotalPrice = (carts: Cart[]) => {
  const total = carts
    .filter(c => c.isChecked)
    .reduce((sum, c) => sum + c.product.price * c.quantity, 0);

  return formatAmount(total);
};
