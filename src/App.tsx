import { FC, useState } from "react";
import "./App.css";
import { Header } from "./components/layouts/Header";
import { Meals } from "./components/meals/Meals";
import { Cart } from "./components/cart/Cart";
import { CartContextProvider } from "./store/CartContextProvider";

const App: FC = () => {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };
  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <CartContextProvider>
      {cartIsVisible && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
};

export default App;
