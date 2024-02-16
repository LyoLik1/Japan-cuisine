import { FC, MouseEventHandler } from "react";
import { Button } from "../UI/Button/Button/Button";

interface CartItemPriceProps {
  key: string;
  price: number;
  name: string;
  amount: number;
  onRemove: MouseEventHandler<HTMLButtonElement>;
  onAdd: MouseEventHandler<HTMLButtonElement>;
}

export const CartItem: FC<CartItemPriceProps> = ({
  price,
  name,
  amount,
  onRemove,
  onAdd,
}) => {
  const priceFix = `$${price.toFixed(2)}`;
  return (
    <li className=" w-[97%] flex justify-between items-center border-b-[3px] border-b-primary-purple my-[20px]">
      <div className="mb-[20px]">
        <h2 className="mb-4 ml-4 font-bold text-2xl text-[#363636]">{name}</h2>
        <div className="w-40 flex justify-between items-center"></div>
        <span className="font-bold mx-4 text-primary-purple">{priceFix}</span>
        <span className="font-bold p-[8px] mx-4 my-2 border-[1px] border-[#ccc] rounded-lg text-xl">
          x {amount}
        </span>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <Button
          label="-"
          className="hover:bg-[#47035d] hover:text-primary-white active:bg-[#47035d] active:text-primary-white"
          type="purple"
          onClick={onRemove}
        />
        <Button
          label="+"
          className="hover:bg-[#47035d] hover:text-primary-white active:bg-[#47035d] active:text-primary-white"
          type="purple"
          onClick={onAdd}
        />
      </div>
    </li>
  );
};
