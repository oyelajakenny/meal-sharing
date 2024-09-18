import express from "express";
import knex from "../database_client.js"

// This router can be deleted once you add your own router
const firstMealRouter = express.Router();

firstMealRouter.get("/", async (req, res) => {
const firstMeal = await knex("meal").orderBy("id").first();
  res.json(firstMeal);
});

export default firstMealRouter;
