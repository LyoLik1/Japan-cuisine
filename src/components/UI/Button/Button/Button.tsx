import { FC, MouseEventHandler } from "react";
import styles from "./Button.module.css";
import cn from "classnames";

interface ButtonProps {
  label: string;
  className: string;
  type?: "primary" | "secondary" | "purple";
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({
  label,
  className = "",
  type = "primary",
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(className, styles.button, styles[type])}
    >
      {label}
    </button>
  );
};
