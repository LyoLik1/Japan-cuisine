import { FC, MouseEventHandler, useContext } from "react";
import { Button } from "../UI/Button/Button/Button";
import { Modal } from "../UI/Modal/Modal";
import { CartContext } from "../../store/Cart-context";
import { CartItem } from "./CartItem";

interface CartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

interface CartProps {
  onHideCart: MouseEventHandler;
}

export const Cart: FC<CartProps> = ({ onHideCart }) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id: string) => {
    cartContext.removeItem(id);
  };
  const addCartItemHandler = (item: CartItem) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className="list-none m-0 p-0 max-h-80 overflow-auto">
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={onHideCart}>
      {cartItems}
      <div className="flex justify-between items-center font-bold text-2xl my-[4] mx-0">
        <span className="mb-[20px]">Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className="text-right">
        <Button
          onClick={onHideCart}
          label="Close"
          className=""
          type="primary"
        />
        {hasItems && (
          <Button
            onClick={() => {}}
            label="Order"
            className=""
            type="secondary"
          />
        )}
      </div>
    </Modal>
  );
};
