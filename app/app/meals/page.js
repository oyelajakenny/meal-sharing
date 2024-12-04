"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MealCard from "@/components/MealCard";
import SortControls from "@/components/SortControls";
import { Typography, Container, Grid, Button, TextField } from "@mui/material";

const MealList = () => {
  const [meals, setMeals] = useState([]); // Meals to display
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [sortOptions, setSortOptions] = useState({
    sortField: "price", // Default sorting field
    sortDirection: "asc", // Default sorting direction
  });

  // Fetch meals when the component mounts or sort/search options change
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const queryParams = new URLSearchParams({
          sortKey: sortOptions.sortField,
          sortDir: sortOptions.sortDirection,
        });
        if (searchQuery.trim()) {
          queryParams.append("title", searchQuery);
        }

        const response = await fetch(
          `http://localhost:3002/meals?${queryParams.toString()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [searchQuery, sortOptions]);

  const handleSearch = () => {
    // Trigger the useEffect by updating the search query
    setSearchQuery(searchQuery.trim());
  };

  return (
    <Container>
      <div className="search-container" >
        <div
          style={{ marginTop: "20px", marginBottom: "20px", display: "flex" }}
        >
          <TextField
            placeholder="Search meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            style={{ marginLeft: "10px" }}
            required
          >
            Search
          </Button>
        </div>
        <div>
          {/* Sort Controls */}
          <SortControls
            sortField={sortOptions.sortField}
            sortDirection={sortOptions.sortDirection}
            onSortChange={setSortOptions}
          />
        </div>
      </div>

      {/* Meal List */}
      <Grid container spacing={3} style={{ marginTop: "20px" }} >
        {meals.length > 0 ? (
          meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <Link href={`/meals/${meal.id}`}>
                <MealCard
                  image={meal.image_url}
                  title={meal.title}
                  description={meal.description}
                  price={meal.price}
                  location={meal.location}
                  max_reservations={meal.max_reservations}
                  available_spots={meal.available_spots}
                />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Loading Meals...</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MealList;
