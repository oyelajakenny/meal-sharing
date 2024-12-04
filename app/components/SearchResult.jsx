"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import MealCard from "@/components/MealCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!title) return;

      console.log(`Fetching: http://localhost:3002/meals?title=${title}`);

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3002/meals?title=${title}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching meals: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched meals:", data);
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [title]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for "{title || "..."}"
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {results.length} result{results.length === 1 ? "" : "s"} found
          </Typography>
          <Grid container spacing={3}>
            {results.map((meal) => (
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
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default SearchResults;
