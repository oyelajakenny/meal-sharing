import express from "express";
import knex   from "../database_client.js";

const allMealsRouter = express.Router();

allMealsRouter.get("/", async (req, res) => {
  const meals = await knex("meal").orderBy("id");
  res.json(meals);
});

export default allMealsRouter;
