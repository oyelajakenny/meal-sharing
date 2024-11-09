"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";

const Meals = ({
  image,
  title,
  description,
  price,
  location,
  max_reservations,
}) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 3 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price} dkk
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Max Reservation: {max_reservations}
        </Typography>
      </CardContent>
    </Card>
  );
};

const MealList = () => {
  const [meals, setMeals] = useState([]);

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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Meals
      </Typography>
      <Grid container spacing={3}>
        {meals.length > 0 ? (
          meals.slice(0, 3).map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <Link href={`/meals/${meal.id}`} >
                <Meals
                  image={meal.image_url}
                  title={meal.title}
                  description={meal.description}
                  price={meal.price}
                  location={meal.location}
                  max_reservations={meal.max_reservations}
                />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No meals found</Typography>
        )}
      </Grid>
      <Link href="/allmeals" passHref>
        <button className="home-button">
          See All Meals
        </button>
      </Link>
    </Container>
  );
};

export default MealList;
