import express from "express";
import knex from "../database_client.js";

const lastMealRouter = express.Router();

lastMealRouter.get("/", async (req, res) => {
  try{
    const lastMeal = await knex("meal").orderBy("id", "desc").first();
    res.json(lastMeal);
  }
  catch(error){
    res.status(404).json({ error: "No meal found" });
  }
});

export default lastMealRouter;
