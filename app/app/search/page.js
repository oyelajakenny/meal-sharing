"use client";
import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import MealCard from "@/components/MealCard";
import SortControls from "@/components/SortControls";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    sortField: "price",
    sortDirection: "asc",
  });
  const [page, setPage] = useState(1);
  const [totalMeals, setTotalMeals] = useState(0);
  const pageSize = 9;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/meals?sortKey=${sortOptions.sortField}&sortDir=${sortOptions.sortDirection}&page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data.meals || []);
        setTotalMeals(data.total || 0);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [sortOptions, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalMeals / pageSize);

  return (
    <Container>
      <SortControls
        sortField={sortOptions.sortField}
        sortDirection={sortOptions.sortDirection}
        onSortChange={setSortOptions}
      />

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {meals.length > 0 ? (
          meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <MealCard
                image={meal.image_url}
                title={meal.title}
                description={meal.description}
                price={meal.price}
                location={meal.location}
                max_reservations={meal.max_reservations}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No meals found</Typography>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>
          <Typography variant="body1" style={{ margin: "0 15px" }}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MealList;
