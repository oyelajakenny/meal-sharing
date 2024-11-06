"use client";

import React, { useState, useEffect } from "react";

const Meals = ({ title, description, price, location, max_reservations }) => {
  return (
    <div className="mealList">
      <div>
        <p>{title}</p>
        <p>Price:{price}dkk</p>
        <p>Description:{description}</p>
        <p>Location:{location}</p>
        <p>Max Reservation :{max_reservations}</p>
      </div>
    </div>
  );
};

const MealList = () => {
  const [meals, setMeals] = useState({});

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3002/meals");
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Available Meals</h1>
      <div className="grid grid-cols-4 gap-4 p-8 ">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div className="meal shadow-lg">
              <Meals
                key={meal.id}
                title={meal.title}
                description={meal.description}
                price={meal.price}
                location={meal.location}
                max_reservations={meal.max_reservations}
              />
            </div>
          ))
        ) : (
          <p>No meals found</p>
        )}
      </div>
    </div>
  );
};

export default MealList;
