import { FC, Fragment, MouseEventHandler } from "react";
import SushiImg from "../../assets/sushi.jpg";
import { HeaderCartButton } from "../UI/Button/HeaderButton/HeaderCartButton";

interface HeaderProps {
  onShowCart: MouseEventHandler<HTMLButtonElement>;
}

export const Header: FC<HeaderProps> = ({ onShowCart }) => {
  return (
    <Fragment>
      <header className="fixed top-0 left-0 w-full h-20 bg-primary-purple text-primary-white flex justify-between items-center px-[10%] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] z-10">
        <h1>Japan Cuisine</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className="w-full h-96 overflow-hidden">
        <img
          src={SushiImg}
          alt="dishes of japan cuisine"
          className="w-full h-full object-cover transform -translate-y-10 translate-x-10 rotate-[-7deg]"
        />
      </div>
    </Fragment>
  );
};
