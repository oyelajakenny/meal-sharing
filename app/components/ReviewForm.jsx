"use client";
import { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const ReviewForm = ({ mealId, onSuccess }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    stars: "",
    description: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3002/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId,
          ...newReview,
        }),
      });
      if (response.ok) {
        const savedReview = await response.json();
        onSuccess(savedReview);
        setNewReview({ title: "", stars: "", description: "" });
        setError(null);
      } else {
        setError("Failed to submit review.");
      }
    } catch (err) {
      setError("An error occurred while submitting the review.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" component="h4" gutterBottom>
        Leave a Review
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Your name"
          value={newReview.title}
          onChange={(e) =>
            setNewReview({ ...newReview, title: e.target.value })
          }
          required
        />
        <TextField
          label="Rating (1-5)"
          type="number"
          value={newReview.stars}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: e.target.value })
          }
          required
          inputProps={{ min: "1", max: "5" }}
        />
        <TextField
          label="Your review"
          value={newReview.description}
          onChange={(e) =>
            setNewReview({ ...newReview, description: e.target.value })
          }
          required
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Review
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ReviewForm;
