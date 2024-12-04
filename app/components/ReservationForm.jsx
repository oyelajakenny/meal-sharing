"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Modal, Fade } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ReservationForm = ({ mealId, open, handleClose, handleSuccess }) => {
  const [reservation, setReservation] = useState({
    meal_id: mealId,
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
    number_of_guests: "",
    created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
  });
  const [availableSpots, setAvailableSpots] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch available spots when the form opens
  useEffect(() => {
    if (mealId) {
      fetch(`http://localhost:3002/meals/${mealId}`)
        .then((response) => response.json())
        .then((data) => setAvailableSpots(data.available_spots || 0))
        .catch((err) => setError("Error fetching available spots."));
    }
  }, [mealId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reservation.number_of_guests > availableSpots) {
      setError(`Cannot reserve more than ${availableSpots} spots.`);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reservation,
          created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
        setReservation({
          contact_name: "",
          contact_phonenumber: "",
          contact_email: "",
          number_of_guests: "",
          created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        });
        handleSuccess();
        handleClose();
      } else {
        setError("Failed to make a reservation.");
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Reservation Form
          </Typography>
          <Typography variant="body2" gutterBottom>
            Available spots:
            <strong className="text-lime-600 font-bold text-base">
              {availableSpots}
            </strong>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Your Name"
              value={reservation.contact_name}
              onChange={(e) =>
                setReservation({ ...reservation, contact_name: e.target.value })
              }
              required
            />
            <TextField
              label="Phone Number"
              type="tel"
              value={reservation.contact_phonenumber}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  contact_phonenumber: e.target.value,
                })
              }
              required
            />
            <TextField
              label="Email"
              type="email"
              value={reservation.contact_email}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  contact_email: e.target.value,
                })
              }
              required
            />
            <TextField
              label="Number of Guests"
              type="number"
              value={reservation.number_of_guests}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  number_of_guests: parseInt(e.target.value, 10),
                })
              }
              required
              inputProps={{ min: 1, max: availableSpots }}
            />
            <TextField
              label="Date"
              type="date"
              value={reservation.created_date}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  created_date: e.target.value,
                })
              }
              required
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={reservation.number_of_guests > availableSpots}
            >
              Submit
            </Button>
            {success && (
              <Typography variant="body2" color="success.main">
                Reservation booked successfully!
              </Typography>
            )}
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
           
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReservationForm;
