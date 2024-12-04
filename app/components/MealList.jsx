"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import BoltIcon from "@mui/icons-material/Bolt";

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
  review,
  Button,
}) => {
  return (
    <Card sx={{ maxWidth: 500, mb: 5 }}>
      <div>
        <CardMedia component="img" height="140" image={image} alt={title} />

        <CardContent>
          <Typography>{review}</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <strong>Description:</strong> {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <CompassCalibrationIcon /> {location.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Max Reservation:{" "}
            <span style={{ fontWeight: "bold", color: "green" }}>
              {max_reservations}
            </span>
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Price:
              <span
                style={{ fontWeight: "bold", color: "green", fontSize: "20px" }}
              >
                {price} Kr
              </span>
            </Typography>
            <Button variant="contained">Reserve</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

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
     const fetchReviews = async () => {
       try {
         const response = await fetch("http://localhost:3002/reviews");
         const reviews = await response.json();
           setReviews(reviews);
       } catch (error) {
         console.error(error);
       }
     };
fetchReviews
    fetchMeals();
  }, []);

  return (
    <Container>
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-between font-sans text-white py-3 px-3 font-bold">
        <Typography variant="h5" component="h5">
          <BoltIcon /> TRENDING MEALS
        </Typography>
        <Link href="/meals">
          <Typography variant="h5" component="h5">
            SEE ALL
          </Typography>
        </Link>
      </div>
      <Grid container spacing={2}>
        {meals.length > 0 ? (
          meals.slice(0, 6).map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <Link href={`/meals/${meal.id}`}>
                <Meals
                  image={meal.image_url}
                  review={reviews.length === 0 ? "No Review" : ""}
                  title={meal.title}
                  description={meal.description}
                  price={meal.price}
                  location={meal.location}
                  max_reservations={meal.max_reservations}
                  Button={Button}
                />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No meals found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MealList;
