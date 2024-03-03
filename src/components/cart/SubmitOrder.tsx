import { FC, FormEvent, MouseEventHandler } from "react";
import { Button } from "../UI/Button/Button/Button";
import { useSubmitOrder } from "../../hooks/useSubmitOrder";

interface UserData {
  name: string;
  city: string;
  adress: string;
}

interface SubmitOrderProps {
  onCancel: MouseEventHandler;
  onSubmit: (UserData: UserData) => any;
}

// const isInputValid = (inputValue: string): boolean => {
//   return inputValue.trim() !== "";
// };

export const SubmitOrder: FC<SubmitOrderProps> = ({ onCancel, onSubmit }) => {
  let isFormValid = false;
  const {
    value: enteredName,
    hasError: hasNameInputError,
    isValid: isEnteredNameValid,
    resetValues: resetNameValues,
    inputChangeHandler: nameInputChangeHandler,
    inputLostFocusHandler: nameInputLostFocusHandler,
  } = useSubmitOrder({ validateValueFunc: (val: string) => val.trim() !== "" });

  const {
    value: enteredCity,
    hasError: hasCityInputError,
    isValid: isEnteredCityValid,
    resetValues: resetCityValues,
    inputChangeHandler: cityInputChangeHandler,
    inputLostFocusHandler: cityInputLostFocusHandler,
  } = useSubmitOrder({ validateValueFunc: (val: string) => val.trim() !== "" });

  const {
    value: enteredAdress,
    hasError: hasAdressInputError,
    isValid: isEnteredAdressValid,
    resetValues: resetAdressValues,
    inputChangeHandler: adressInputChangeHandler,
    inputLostFocusHandler: adressInputLostFocusHandler,
  } = useSubmitOrder({ validateValueFunc: (val: string) => val.trim() !== "" });

  if (isEnteredNameValid && isEnteredCityValid && isEnteredAdressValid) {
    isFormValid = true;
  }
  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!isEnteredNameValid && !isEnteredCityValid && !isEnteredAdressValid) {
      return;
    }

    onSubmit({
      name: enteredName,
      city: enteredCity,
      adress: enteredAdress,
    });

    resetNameValues();
    resetCityValues();
    resetAdressValues();
  };

  return (
    <form onSubmit={formSubmitHandler} className="overflow-auto h-[320px]">
      <div className="mb-4">
        <label htmlFor="name" className="block">
          Enter Name
        </label>
        <input
          type="text"
          id="name"
          onBlur={nameInputLostFocusHandler}
          onChange={nameInputChangeHandler}
          value={enteredName}
          placeholder="Name"
          className={`w-full border border-gray-300 rounded-xl p-2 ${
            hasNameInputError ? "border-red-800 bg-[#dccccc]" : ""
          } `}
        />
        {hasNameInputError && (
          <span className="text-red-700">this field is required</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block">
          Enter your city
        </label>
        <input
          type="text"
          id="city"
          onBlur={cityInputLostFocusHandler}
          onChange={cityInputChangeHandler}
          value={enteredCity}
          placeholder="City"
          className={`w-full border border-gray-300 rounded-xl p-2 ${
            hasCityInputError ? "border-red-800 bg-[#dccccc]" : ""
          } `}
        />
        {hasCityInputError && (
          <span className="text-red-700">this field is required</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block">
          Enter address
        </label>
        <input
          type="text"
          id="address"
          onBlur={adressInputLostFocusHandler}
          onChange={adressInputChangeHandler}
          value={enteredAdress}
          placeholder="Address"
          className={`w-full border border-gray-300 rounded-xl p-2 ${
            hasAdressInputError ? "border-red-800 bg-[#dccccc]" : ""
          } `}
        />
        {hasAdressInputError && (
          <span className="text-red-700">this field is required</span>
        )}
      </div>
      <Button
        typeButton="submit"
        label="Submit Order"
        className="bg-primary-purple"
        type="secondary"
        onClick={() => {}}
      />
      <Button
        label="Cancel"
        type="primary"
        typeButton="button"
        onClick={onCancel}
      />
    </form>
  );
};
