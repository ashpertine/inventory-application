import { Router } from "express";
import pokemonController from "../controllers/pokemonController.js";

const pokemonRouter = Router();

pokemonRouter.get(
  "/from/:trainerId",
  pokemonController.getAllPokemonByTrainerIdView,
);
pokemonRouter.post("/new", pokemonController.insertNewPokemonPost);
pokemonRouter.post("/:pokemonId/delete", pokemonController.deletePokemonPost);

export { pokemonRouter };
