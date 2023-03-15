export interface CartItemGame {
  id: number;
  title: string;
  cover: string;
  price: number;
  isActive: boolean;
  stock: number;
}

export interface CartItem {
  quantity: number;
  addedOn: Date;
  game: CartItemGame;
}

export interface Cart {
  id: number;
  createdOn: Date;
  items: CartItem[];
}
