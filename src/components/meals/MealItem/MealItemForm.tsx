import { FC, FormEvent, useRef, useState } from "react";
import { Input } from "../../UI/Input/Input";

interface MealItemFormProps {
  id: string;
  onAddToCart(amount: number): void;
}

export const MealItemForm: FC<MealItemFormProps> = ({ id, onAddToCart }) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const inputAmount = amountInputRef.current?.value;
    if (
      !inputAmount ||
      inputAmount.trim().length === 0 ||
      +inputAmount < 1 ||
      +inputAmount > 10
    ) {
      setIsAmountValid(false);
      return;
    }

    onAddToCart(+inputAmount);
  };

  return (
    <form className="text-right" onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: id,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button
        type="submit"
        className=" w-[120px] font-inherit pointer bg-primary-purple border-[1px] border-primary-purple text-primary-white py-1 px-8 rounded-[20px] font-bold	hover:bg-[#47035d] hover:border-[#47035d] activate:bg-[#47035d] activate:border-[#47035d]"
      >
        Add
      </button>
      {!isAmountValid && (
        <p className="text-[#FF0000]">Please,enter a quantity from 1 to 10</p>
      )}
    </form>
  );
};
