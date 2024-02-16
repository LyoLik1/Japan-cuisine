import { FC, useContext } from "react";
import { CartContext } from "../../../store/Cart-context";
import { MealItemForm } from "./MealItemForm";

interface MealItemProps {
  name: string;
  description: string;
  price: number;
  id: string;
}

export const MealItem: FC<MealItemProps> = ({
  name,
  description,
  price,
  id,
}) => {
  const cartContext = useContext(CartContext);
  const formattedPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    cartContext.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className="flex justify-between m-4 pb-2 border-b-[1px] border-b-[#ccc] last:mb-0">
      <div className="">
        <h3 className="m-0 mb-[1] font-bold text-xl">{name}</h3>
        <div className="italic">{description}</div>
        <div className="mt-1 font-bold text-primary-purple text-xl">
          {formattedPrice}
        </div>
      </div>
      <div className="">
        <MealItemForm onAddToCart={addToCartHandler} id={id} />
      </div>
    </li>
  );
};
