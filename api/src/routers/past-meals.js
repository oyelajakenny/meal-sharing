import express from "express";
import knex from "../database_client.js"

// This router can be deleted once you add your own router
const pastMealsRouter = express.Router();

pastMealsRouter.get("/", async (req, res) => {
const pastMeals = await knex("meal").where("when", "<", knex.fn.now());
 res.json(pastMeals);
});


export default pastMealsRouter;


