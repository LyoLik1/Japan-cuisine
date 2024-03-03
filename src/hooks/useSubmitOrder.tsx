import { useReducer, ChangeEvent } from "react";

interface FormProps {
  validateValueFunc: (value: string) => boolean;
}

interface formResult {
  value: string;
  hasError: boolean;
  isValid: boolean;
  resetValues: () => void;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  inputLostFocusHandler: () => void;
}

const initialInputState = {
  inputValue: "",
  wasFocused: false,
};

const inputStateReducer = (state: any, action: any) => {
  if (action.type === "INPUT_CHANGE") {
    return { inputValue: action.value, wasFocused: state.wasFocused };
  }

  if (action.type === "INPUT_BLUR") {
    return { wasFocused: true, inputValue: state.inputValue };
  }

  if (action.type === "RESET_INPUT") {
    return { wasFocused: false, inputValue: "" };
  }

  return initialInputState;
};

export const useSubmitOrder = ({
  validateValueFunc,
}: FormProps): formResult => {
  const [inputState, dispatchAction] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const isValueValid = validateValueFunc(inputState.inputValue);
  const isInputValid = !inputState.inputValue && inputState.wasFocused;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchAction({ type: "INPUT_CHANGE", value: event.target.value });
  };
  const inputLostFocusHandler = () => [dispatchAction({ type: "INPUT_BLUR" })];
  const resetValues = () => dispatchAction({ type: "RESET_INPUT" });

  return {
    value: inputState.inputValue,
    hasError: isInputValid,
    isValid: isValueValid,
    resetValues,
    inputChangeHandler,
    inputLostFocusHandler,
  };
};
