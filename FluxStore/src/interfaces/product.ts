export interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  discount?: number;
  reviewCount?: number;
  description?: string;
}
