interface ProductItem {
  id: string;
  image: string;
  name: string;
  price: number;
}

export interface Cart {
  id: string;
  product: ProductItem;
  sizes: string;
  colors: string;
  quantity: number;
  isChecked: boolean;
}
