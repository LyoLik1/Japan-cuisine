import { FC, Fragment } from "react";
import { MealsList } from "./MealsList";
import { PromoText } from "./PromoText";
export const Meals: FC = () => {
  return (
    <Fragment>
      <PromoText />
      <MealsList />
    </Fragment>
  );
};
