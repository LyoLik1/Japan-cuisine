import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import { CartContext } from "../../../../store/Cart-context";
import CartImg from "../../../../assets/cart.svg";
import styles from "./HeaderCartButton.module.css";

interface HeaderCartButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const HeaderCartButton: FC<HeaderCartButtonProps> = ({ onClick }) => {
  const cartContext = useContext(CartContext);
  const [isButtonAnimated, setSsButtonAnimated] = useState(false);

  const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);

  const buttonClasses = `${styles.button} ${
    isButtonAnimated ? styles.bump : ""
  }`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setSsButtonAnimated(true);
    const timer = setTimeout(() => {
      setSsButtonAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button onClick={onClick} className={buttonClasses}>
      <span className={styles.icon}>
        <img src={CartImg} alt="Cart" />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
  );
};
