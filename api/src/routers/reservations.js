import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

reservationsRouter.get("/", async (req, res) => {
  const reservations = await knex("reservation").orderBy("id");
  res.json(reservations);
});

reservationsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    await knex("Reservation").insert(data);
    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    next(error);
  }
});

reservationsRouter.get("/reservations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const reservations = await knex("reservation").where({ id: id }).first();
    if (!reservations) {
      res.status(404).json({ error: "No reservation found" });
    } else {
      res.status(200).json(reservations);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to get reservation" });
  }
});

reservationsRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await knex("Reservation").where({ id: id }).update(data);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update reservation" });
  }
});

reservationsRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await knex("Reservation").where({ id: id }).del();
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete reservation" });
  }
});

export default reservationsRouter;
