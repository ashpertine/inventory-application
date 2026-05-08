import trainerQueries from "../db/trainerQueries.js";

async function getAllTrainersView(req, res) {
  try {
    const results = await trainerQueries.getAllTrainers();
    res.render("trainers", { results: results });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function insertNewTrainerPost(req, res) {
  try {
    const trainerName = req.body.trainer_name;
    const characterType = req.body.character_type;
    await trainerQueries.insertNewTrainer(trainerName, characterType);
    res.status(200).redirect("/trainer");
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateTrainerView(req, res) {
  try {
    const trainerId = req.params.id;
    const results = await trainerQueries.getTrainerById(trainerId);
    const trainerInfo = results[0];
    res.render("updatetrainer", trainerInfo);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateTrainerDetailsPost(req, res) {
  try {
    const trainerId = req.params.id;
    const newTrainerName = req.body.trainer_name;
    const newTrainerCharacterType = req.body.character_type;
    await trainerQueries.updateTrainerById(
      trainerId,
      newTrainerName,
      newTrainerCharacterType,
    );
    res.status(200).redirect("/trainer");
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteTrainerPost(req, res) {
  try {
    const trainerId = req.params.id;
    await trainerQueries.deleteTrainerById(trainerId);
    res.status(200).redirect("/trainer");
  } catch (error) {
    res.status(500).json(error);
  }
}

export default {
  getAllTrainersView,
  insertNewTrainerPost,
  updateTrainerView,
  updateTrainerDetailsPost,
  deleteTrainerPost,
};
