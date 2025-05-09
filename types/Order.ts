export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export type Order = {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  deliveryDate: string;
};