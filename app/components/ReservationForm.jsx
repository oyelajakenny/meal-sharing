"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";

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
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3002/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId,
          ...reservation,
        }),
      });
      if (response.ok) {
        handleSuccess();
        setError(null);
        setReservation({
          contact_name: "",
          contact_phonenumber: "",
          contact_email: "",
        });
        handleClose();
      } else {
        setError("Failed to make a reservation.");
      }
    } catch (err) {
      setError("An error occurred while making a reservation.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Reservation Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Your name"
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
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
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
