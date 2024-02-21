import { useEffect, useState } from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "./hooks/useHttp";
import Error from "./Error.jsx";
const requetsConfig = {};
export default function Meals() {
  const {
    data: meals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requetsConfig, []);
  if (isLoading) {
    return <p className="center">Loading data</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meal" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}
