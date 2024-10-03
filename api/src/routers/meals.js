import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  const meals = await knex("meal").orderBy("id");
  res.json(meals);
});

mealsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    await knex("Meal").insert(data);
    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    next(error);
  }
});

mealsRouter.get("/meals/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meals = await knex("meal").where({ id: id }).first();
    if (!meals) {
      res.status(404).json({ error: "No meal found" });
    } else {
      res.json(meals);
    }
    res.status(200).json({
      success: true,
      meals: meals,
    });
  } catch (error) {
    next(res.status(500).json({ error: "Unable to retrieve meal" }));
  }
});

mealsRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await knex("meal").where({ id: id }).update(data);
    if (!id) {
      res.status(404).json({ error: "No ID found" });
    } else {
      res.status(200).json({ message: "updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update meal" });
  }
});

mealsRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await knex("meal").where({ id: id }).del();
    if (!id) {
      res.status(404).json({ error: "No meal with this ID found" });
    } else {
      res.status(200).json({ message: "Meal deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete meal" });
  }
});

export default mealsRouter;
