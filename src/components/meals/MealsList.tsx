import { FC, useEffect, useState } from "react";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";
import axios from "axios";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: 'Roll "Naomi"',
//     description:
//       "Cream cheese, chicken fillet, masago, tomato, cucumber, sesame seeds",
//     price: 11.99,
//   },
//   {
//     id: "m2",
//     name: "Spice Salmon",
//     description: "Rice, salmon, spice sauce",
//     price: 3.99,
//   },
//   {
//     id: "m3",
//     name: "Eel Sushi",
//     description: "Smoked eel, eel sauce, sesame seeds",
//     price: 4.99,
//   },
//   {
//     id: "m4",
//     name: 'Salad "Salmon Poke"',
//     description:
//       "Rice, salmon, cucumber, chuka, nori, tuna shavings, nut sauce",
//     price: 7.99,
//   },
// ];

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const MealsList: FC = () => {
  const [meals, setMeals] = useState<Product[]>([]);
  const [httpErrorMessage, setHttpErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async (): Promise<Product[]> => {
      setIsLoading(true);
      setHttpErrorMessage(null);
      try {
        const response = await axios.get(
          "https://react-course-http-109b9-default-rtdb.firebaseio.com/meals.json"
        );

        const data = await response.data;
        const loadedProducts = [];
        for (const key in data) {
          loadedProducts.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedProducts);

        return data;
      } catch (err: any) {
        if (err.response) setHttpErrorMessage("Smth went wrong!");

        return [];
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className="text-center py-4">
        <p>Retrieving data from server</p>
      </section>
    );
  }
  if (httpErrorMessage) {
    return (
      <section className="text-center py-4">
        <p className="text-red-700">{httpErrorMessage}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
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
