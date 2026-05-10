import { Router } from "express";
import trainerController from "../controllers/trainerController.js";

const trainerRouter = Router();
trainerRouter.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
trainerRouter.get("/", trainerController.getAllTrainersView);
trainerRouter.post("/new", trainerController.insertNewTrainerPost);
trainerRouter.get("/:id/update", trainerController.updateTrainerView);
trainerRouter.post("/:id/update", trainerController.updateTrainerDetailsPost);
trainerRouter.post("/:id/delete", trainerController.deleteTrainerPost);

export { trainerRouter };
