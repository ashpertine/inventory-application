import { Router } from "express";
import pokemonController from "../controllers/pokemonController.js";

const pokemonRouter = Router();

pokemonRouter.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
pokemonRouter.get(
  "/from/:trainerId",
  pokemonController.getAllPokemonByTrainerIdView,
);
pokemonRouter.get("/wild", pokemonController.wildPokemonView);
pokemonRouter.post("/new", pokemonController.insertNewPokemonPost);
pokemonRouter.post("/:pokemonId/delete", pokemonController.deletePokemonPost);
pokemonRouter.get("/:pokemonId/update", pokemonController.updatePokemonView);
pokemonRouter.post(
  "/:pokemonId/update",
  pokemonController.updatePokemonDetailsPost,
);

pokemonRouter.post(
  "/wild/:trainerId/catch/:pokemonId",
  pokemonController.updatePokemonOwnerPost,
);

export { pokemonRouter };
