import {Product} from '@/interfaces';

export const PRODUCT_COLORS = ['#fff', '#b4916c', '#e4cbad'];
/**
 * https://i.ibb.co/gZJc13TM/Mask-Group-5.png
https://i.ibb.co/FkZjz274/Mask-Group-4.png
https://i.ibb.co/zH0RMXCV/image-78-1.png
https://i.ibb.co/K38nmrr/Mask-Group-3.png
https://i.ibb.co/Jw9tjsj3/Mask-Group-2.png
https://i.ibb.co/SD47BZNp/Mask-Group-1.png
 */
export const PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'Linen Dress',
    price: 90,
    discount: 10,
    rating: 5,
    reviewCount: 20,
    image: 'https://i.ibb.co/SD47BZNp/Mask-Group-1.png',
    description:
      'Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home.',
  },
  {
    id: '02',
    name: 'Filted Waist Dress',
    price: 82,
    discount: 0,
    rating: 3,
    reviewCount: 110,
    image: 'https://i.ibb.co/Jw9tjsj3/Mask-Group-2.png',
    description:
      'Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home.',
  },
];
