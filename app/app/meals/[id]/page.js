"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Typography, Paper, Container, Box, Button } from "@mui/material";
import ReservationForm from "@/components/ReservationForm";
import ReviewForm from "@/components/ReviewForm";

function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3002/meals/${id}`)
        .then((response) => response.json())
        .then((data) => setMeal(data))
        .catch((err) => setError("Error fetching meal details"));

      fetch(`http://localhost:3002/meals/${id}/reviews`)
        .then((response) => response.json())
        .then((data) => setReviews(data))
        .catch((err) => setError("Error fetching reviews"));
    }
  }, [id]);

  return (
    <Container>
      {meal ? (
        <>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
            <img src={meal.image_url} alt={meal.title} width="100%" />
            <Typography variant="h4" component="h2" gutterBottom>
              {meal.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {meal.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: {meal.price} Kr
            </Typography>
            <Typography variant="h6" gutterBottom>
              {meal.location}
            </Typography>

            {meal.max_reservations > 0 ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                  sx={{ marginBottom: 2 }}
                >
                  Make A Reservation
                </Button>
                <ReservationForm
                  mealId={id}
                  open={open}
                  handleClose={handleClose}
                  setReservationSuccess={setReservationSuccess}
                  setError={setError}
                />
              </>
            ) : (
              <Typography variant="body1" color="error">
                No available seats.
              </Typography>
            )}
            {reservationSuccess && (
              <Typography variant="body1" color="success.main">
                Reservation successful!
              </Typography>
            )}
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
          </Paper>

          <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Reviews
            </Typography>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Box
                  key={review.id}
                  className="review"
                  sx={{ marginBottom: 2 }}
                >
                  <Typography variant="subtitle1">
                    <strong>{review.name}</strong> rated {review.rating}/5
                  </Typography>
                  <Typography variant="body2">{review.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1">
                No reviews yet. Be the first to review this meal!
              </Typography>
            )}
          </Paper>

          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" component="h4" gutterBottom>
              Leave a Review
            </Typography>
            <ReviewForm
              mealId={id}
              setReviewSuccess={setReviewSuccess}
              setReviews={setReviews}
              setError={setError}
            />
            {reviewSuccess && (
              <Typography variant="body1" color="success.main">
                Review submitted successfully!
              </Typography>
            )}
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
          </Paper>
        </>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Container>
  );
}

export default MealDetail;
