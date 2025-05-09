export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  popular?: boolean;
  reviews?: number;
  stock?: number;
  benefits?: string[];
  rating?: number;
  };