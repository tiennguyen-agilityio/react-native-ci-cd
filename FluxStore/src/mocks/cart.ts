import {PRODUCTS} from './product';

export const CARTS = [
  {
    id: '01',
    product: {
      id: PRODUCTS[0].id,
      image: PRODUCTS[0].image,
      name: PRODUCTS[0].name,
      price: PRODUCTS[0].price,
    },
    sizes: [PRODUCTS[0]?.sizes?.[0], PRODUCTS[0]?.sizes?.[1]].join(', '),
    colors: [PRODUCTS[0]?.colors?.[0]].join(', '),
    quantity: 2,
    isChecked: true,
  },
  {
    id: '02',
    product: {
      id: PRODUCTS[1].id,
      image: PRODUCTS[1].image,
      name: PRODUCTS[1].name,
      price: PRODUCTS[1].price,
    },
    sizes: [PRODUCTS[1]?.sizes?.[0], PRODUCTS[1]?.sizes?.[1]].join(', '),
    colors: [PRODUCTS[1]?.colors?.[0], PRODUCTS[1]?.colors?.[1]].join(', '),
    quantity: 1,
    isChecked: false,
  },
];
