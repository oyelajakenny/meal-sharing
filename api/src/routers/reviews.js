import express from "express";
import knex from "../database_client.js";

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const allReviews = await knex("review").orderBy("id");
    res.json(allReviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("review").where("meal_id", meal_id).select("*");

    if (reviews.length === 0) {
      res.status(404).json({ error: "No review found" });
    }
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(505).json({ error: "Internal server error" });
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    await knex("review").insert(data);
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    next(error);
  }
});

reviewRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("review").where({ id }).first();
    if (!review) {
      res.status(404).json({ error: "No review found" });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    console.log(error);
    res.status(505).json({ error: "Internal server error" });
  }
});

reviewRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.body;
    await knex("review").where({ id }).update(data);
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update review" });
  }
});

reviewRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("review").where({ id }).del();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to delete review" });
  }
});

export default reviewRouter;
