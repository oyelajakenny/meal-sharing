import express from "express";
import knex from "../database_client.js";

// This router can be deleted once you add your own router
const futureMealsRouter = express.Router();

futureMealsRouter.get("/", async (req, res) => {
  const futureMeals = await knex("meal").where("when", ">", knex.fn.now());
  res.json(futureMeals); 
}
);

export default futureMealsRouter;
