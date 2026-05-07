import { Router } from "express";
import trainerController from "../controllers/trainerController.js";

const trainerRouter = Router();
trainerRouter.get("/", trainerController.getAllTrainersView);
trainerRouter.post("/new", trainerController.insertNewTrainerPost);
trainerRouter.get("/:id/update", trainerController.updateTrainerView);
trainerRouter.post("/:id/update", trainerController.updateTrainerDetailsPost);
trainerRouter.post("/:id/delete", trainerController.deleteTrainerPost);

export { trainerRouter };
