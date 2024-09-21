import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import allMealsRouter from "./routers/all-meals.js";
import pastMealsRouter from "./routers/past-meals.js";
import futureMealsRouter from "./routers/future-meals.js";
import firstMealRouter from "./routers/first-meal.js";
import lastMealRouter from "./routers/last-meal.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

app.use("/api", apiRouter);
app.use("/all-meals", allMealsRouter);
app.use("/past-meals", pastMealsRouter);
app.use("/future-meals", futureMealsRouter);
app.use("/first-meal", firstMealRouter);
app.use("/last-meal", lastMealRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
