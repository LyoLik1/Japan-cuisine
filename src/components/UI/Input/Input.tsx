import { FC, forwardRef, ForwardedRef } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  input: {
    id: string;
    [key: string]: any;
  };
  ref: ForwardedRef<HTMLInputElement>;
}

export const Input: FC<InputProps> = forwardRef(
  ({ label, input }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={styles.input}>
        <label htmlFor={input.id}>{label}</label>
        <input ref={ref} {...input} />
      </div>
    );
  }
);
