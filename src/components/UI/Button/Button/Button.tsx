import { FC, MouseEventHandler } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

interface ButtonProps {
  label: string;
  className?: string;
  typeButton?: "button" | "submit" | "reset";
  type?: "primary" | "secondary" | "purple";
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({
  label,
  className = "",
  type = "primary",
  onClick = () => {},
  typeButton,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(className, styles.button, styles[type])}
      type={typeButton}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
