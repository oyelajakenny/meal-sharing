import express from "express";
import knex from "../database_client.js";

const futureMealsRouter = express.Router();

futureMealsRouter.get("/", async (req, res) => {
  const futureMeals = await knex("meal").where("when", ">", knex.fn.now());
  res.json(futureMeals);
});

export default futureMealsRouter;
