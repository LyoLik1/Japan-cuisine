import { FC, createContext } from "react";

interface CartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});