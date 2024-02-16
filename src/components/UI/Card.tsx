import { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className="p-[25px] rounded-2xl bg-primary-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
      {children}
    </div>
  );
};
