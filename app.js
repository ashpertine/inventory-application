import express from "express";
import path from "path";
import fs from "fs";
import { trainerRouter } from "./routes/trainerRoutes.js";
import { pokemonRouter } from "./routes/pokemonRoutes.js";

const __dirname = import.meta.dirname;
const PORT = process.env.SERVER_PORT;
const assetsPath = path.join(__dirname, "public");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(assetsPath));

app.use("/trainer", trainerRouter);
app.use("/pokemon", pokemonRouter);
app.use(/(.*)/, (req, res) => {
  res.redirect("/trainer");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server is running on port ${PORT}`);
});
