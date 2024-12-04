import React from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";

const Hero = () => {
    return (
      <div >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 class="text-8xl font-bold text-left">
              Your Next Meal, a Shared Experience That Tells a Story
            </h1>
            <p className="hero-description">
              Explore Local Meals, Meet New Friends, and Share Memorable Dining
              Experiences. Discover Unique Meals and Create Unforgettable
              Moments Together.
            </p>
            <Stack direction="row" spacing={2}>
              <Link href="/meals" passHref>
                <Button variant="outlined" color="secondary">
                  Make Reservation
                </Button>
              </Link>
              <Link href="/meals" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<SendIcon />}
                >
                  Explore Meals
                </Button>
              </Link>
            </Stack>
          </div>
          <div className="hero-content">
            <img src="./meal.svg" alt="Hero" />
          </div>
        </div>
      </div>
    );
};

export default Hero;