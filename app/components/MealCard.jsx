import React from "react";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";


const MealCard = ({
  image,
  title,
  description,
  price,
  location,
  max_reservations,
  available_spots,
}) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 3 }} >
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Description:</strong> {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <CompassCalibrationIcon /> {location.toUpperCase()}
        </Typography>
        <Typography variant="body2">
          Available Spots: {available_spots} / {max_reservations}
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
            Price:{" "}
            <span
              style={{ fontWeight: "bold", color: "green", fontSize: "20px" }}
            >
              {price} Kr
            </span>
          </Typography>
          <Button variant="contained">Reserve</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;