import { inventoryPool } from "./pool.js";

async function getAllTrainers() {
  const SQL = "SELECT * FROM trainers";
  const { rows } = await inventoryPool.query(SQL);
  return rows;
}

async function getTrainerById(trainer_id) {
  const SQL = "SELECT * FROM trainers WHERE id = $1";
  const { rows } = await inventoryPool.query(SQL, [trainer_id]);
  return rows;
}

async function insertNewTrainer(name, character_type) {
  const defaultNoGymBadges = 0;
  const SQL =
    "INSERT INTO trainers (name, character_type, no_gym_badges) VALUES ($1, $2, $3)";
  await inventoryPool.query(SQL, [name, character_type, defaultNoGymBadges]);
}

async function updateTrainerById(trainer_id, new_name, character_type) {
  const SQL =
    "UPDATE trainers SET name = $1, character_type = $2 WHERE id = $3";
  await inventoryPool.query(SQL, [new_name, character_type, trainer_id]);
}

async function deleteTrainerById(trainer_id) {
  const SQL = "DELETE FROM trainers WHERE id = $1";
  await inventoryPool.query(SQL, [trainer_id]);
}

export default {
  getAllTrainers,
  getTrainerById,
  insertNewTrainer,
  updateTrainerById,
  deleteTrainerById,
};
