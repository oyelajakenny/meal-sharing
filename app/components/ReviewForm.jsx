"use client";
import { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

const ReviewForm = ({ mealId, onSuccess }) => {
  const [newReview, setNewReview] = useState({
    meal_id: mealId,
    title: "",
    stars: "",
    description: "",
    created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
  });
  const [error, setError] = useState(null);

 const [success, setSuccess] = useState(false);

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch(`http://localhost:3002/reviews`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newReview),
     });
     if (response.ok) {
         setError(null);
       setSuccess(true); 
       setNewReview({
         meal_id: mealId,
         title: "",
         stars: "",
         description: "",
         created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
       });
     } else {
       setError("Failed to submit review");
       setSuccess(false);
     }
   } catch (err) {
     setError("An error occurred while submitting the review.");
     setSuccess(false);
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
         label="Title"
         value={newReview.title}
         onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
         required
       />
       <TextField
         label="Rating (1-5)"
         type="number"
         value={newReview.stars}
         onChange={(e) => setNewReview({ ...newReview, stars: e.target.value })}
         required
         inputProps={{ min: "1", max: "5" }}
       />
       <TextField
         label="Created Date"
         type="date"
         value={newReview.created_date}
         onChange={(e) =>
           setNewReview({
             ...newReview,
             created_date: e.target.value,
           })
         }
         required
         InputLabelProps={{
           shrink: true,
         }}
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
       {success && (
         <Typography variant="body2" color="success.main">
           Review submitted successfully!
         </Typography>
       )}
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
