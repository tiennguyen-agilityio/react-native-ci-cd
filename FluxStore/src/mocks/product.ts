import {Product} from '@/interfaces';

export const COLORS = ['black', 'red', 'blue'];
export const SIZES = ['S', 'M', 'L'];

export const PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'Linen Dress',
    price: 90.02,
    discount: 10,
    rating: 5,
    reviewCount: 20,
    image: 'https://i.ibb.co/SD47BZNp/Mask-Group-1.png',
    description:
      'Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home.',
    sizes: ['s', 'M'],
    colors: ['black', 'red', 'blue'],
    carouselImages: [
      'https://i.ibb.co/KQj6DyL/image-87.png',
      'https://i.ibb.co/SD47BZNp/Mask-Group-1.png',
      'https://i.ibb.co/Jw9tjsj3/Mask-Group-2.png',
    ],
  },
  {
    id: '02',
    name: 'Filted Waist Dress',
    price: 82.0,
    discount: 0,
    rating: 3,
    reviewCount: 110,
    image: 'https://i.ibb.co/Jw9tjsj3/Mask-Group-2.png',
    description:
      'Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home.',
    sizes: ['XL'],
    colors: ['pink', 'black'],
    carouselImages: [
      'https://i.ibb.co/KQj6DyL/image-87.png',
      'https://i.ibb.co/SD47BZNp/Mask-Group-1.png',
      'https://i.ibb.co/Jw9tjsj3/Mask-Group-2.png',
    ],
  },
];
