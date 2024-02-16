import { FC } from "react";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: 'Roll "Naomi"',
    description:
      "Cream cheese, chicken fillet, masago, tomato, cucumber, sesame seeds",
    price: 11.99,
  },
  {
    id: "m2",
    name: "Spice Salmon",
    description: "Rice, salmon, spice sauce",
    price: 3.99,
  },
  {
    id: "m3",
    name: "Eel Sushi",
    description: "Smoked eel, eel sauce, sesame seeds",
    price: 4.99,
  },
  {
    id: "m4",
    name: 'Salad "Salmon Poke"',
    description:
      "Rice, salmon, cucumber, chuka, nori, tuna shavings, nut sauce",
    price: 7.99,
  },
];

export const MealsList: FC = () => {
  const mealList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className="max-w-3xl w-[90%] my-[30px] mx-[auto] animate-anim-1s-ease-out-forwards">
      <Card>
        <ul className="list-none m-0 p-0">{mealList}</ul>
      </Card>
    </section>
  );
};
