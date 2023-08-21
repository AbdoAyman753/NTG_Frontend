export interface Cart{
  items: Array<CartItem>;
}

export interface CartItem{
  title: string;
  id: number;
  price: number;
  description: string;
  coverImage: string;
}
