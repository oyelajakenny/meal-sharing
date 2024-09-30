import express from "express";
import knex from "../database_client.js";

const firstMealRouter = express.Router();

firstMealRouter.get("/", async (req, res) => {
  try {
    const firstMeal = await knex("meal").orderBy("id").first();
    
    res.json(firstMeal);
  } catch (error) {
    res.status(404).json({ error: "No meal found" });
  }
});

export default firstMealRouter;
