import { FC, Fragment, MouseEventHandler, useContext, useState } from "react";
import { Button } from "../UI/Button/Button/Button";
import { Modal } from "../UI/Modal/Modal";
import { CartContext } from "../../store/Cart-context";
import { CartItem } from "./CartItem";
import { SubmitOrder } from "./SubmitOrder";
import axios from "axios";
interface CartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}
interface UserData {
  name: string;
  city: string;
  adress: string;
}

interface CartProps {
  onHideCart: MouseEventHandler;
}

export const Cart: FC<CartProps> = ({ onHideCart }) => {
  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);
  const [isDataSubmitting, setIsDataSubmitting] = useState(false);
  const [wasDataSendlingSuccessful, setwasDataSendlingSuccessful] =
    useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id: string) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item: CartItem) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsSubmitOrderAvailable(true);
  };

  const submitOrderHandler = async (userData: UserData) => {
    setIsDataSubmitting(true);
    try {
      const response = await axios.post(
        "https://react-course-http-109b9-default-rtdb.firebaseio.com/orders.json",
        { user: userData, orderedMeals: cartContext.items },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setwasDataSendlingSuccessful(true);
        cartContext.clearCart();
      }
      // Ваш код обработки статуса ответа
    } catch (error) {
      console.error(error);
      // Обработка ошибки
    } finally {
      setIsDataSubmitting(false);
    }
  };

  const cartItems = (
    <ul className="list-none mb-4 p-0 max-h-80 overflow-auto">
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

  const modalButtons = (
    <div className="text-right">
      <Button onClick={onHideCart} label="Close" className="" type="primary" />
      {hasItems && (
        <Button
          onClick={orderHandler}
          label="Order"
          className=""
          type="secondary"
        />
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className="flex justify-between items-center font-bold text-2xl my-[4] mx-0">
        <span className="mb-[20px]">Total</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmitOrderAvailable && (
        <SubmitOrder onSubmit={submitOrderHandler} onCancel={onHideCart} />
      )}
      {!isSubmitOrderAvailable && modalButtons}
    </Fragment>
  );

  const dataSubmittingCartModalContent = <p>Ыending order data...</p>;

  const dataWasSubmitedCartModalContent = (
    <Fragment>
      <p>Your order has been sent successfully</p>
      <div className="text-right">
        <Button
          onClick={onHideCart}
          label="Close"
          className=""
          type="primary"
        />
      </div>
    </Fragment>
  );

  return (
    <Modal onClick={onHideCart}>
      {!isDataSubmitting && !wasDataSendlingSuccessful && cartModalContent}
      {isDataSubmitting && dataSubmittingCartModalContent}
      {wasDataSendlingSuccessful && dataWasSubmitedCartModalContent}
    </Modal>
  );
};
