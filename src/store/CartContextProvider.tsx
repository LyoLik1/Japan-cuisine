import { FC, ReactNode } from "react";
import { useReducer } from "react";
import { CartContext } from "./Cart-context";
interface CartItem {
  id: string;
  name: string;
  price: number;
  amount: number;
}

interface CartContextType {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const defaultCardState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (
  state: { items: CartItem[]; totalAmount: number },
  action: { type: string; item?: CartItem; id?: string }
) => {
  if (action.type === "ADD_ITEM" && action.item) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item?.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = {
        ...action.item,
      };
      updatedItems = state.items.concat(updatedItem);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    if (existingCartItemIndex === -1) {
      return state;
    }
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR_CART") {
    return defaultCardState;
  }
  return defaultCardState;
};

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCardState
  );

  const addItemHandler = (item: CartItem) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id: string) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const cartContext: CartContextType = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
