import { inventoryPool } from "./pool.js";

async function getAllPokemon() {
  const SQL = ` SELECT pokemon.id as pokemon_id, pokemon.name, attack, defense, type.name AS type_name FROM pokemon 
                INNER JOIN type
                ON pokemon.type_id = type.id`;
  const { rows } = await inventoryPool.query(SQL);
  return rows;
}

async function getPokemonById(pokemon_id) {
  const SQL = ` SELECT pokemon.id as pokemon_id, pokemon.name, attack, defense, type.name AS type_name FROM pokemon 
                INNER JOIN type
                ON pokemon.type_id = type.id
                WHERE pokemon.id = $1`;
  const { rows } = await inventoryPool.query(SQL, [pokemon_id]);
  return rows;
}

async function getOwnerIdByPokemonId(pokemon_id) {
  const SQL = `SELECT trainer_id FROM pokemon WHERE id = $1`;
  const { rows } = await inventoryPool.query(SQL, [pokemon_id]);
  const trainerId = rows[0].trainer_id;
  return trainerId;
}

async function getAllPokemonByTrainerId(trainer_id) {
  const SQL = ` SELECT pokemon.id as pokemon_id, pokemon.name, attack, defense, type.name AS type_name FROM pokemon 
                INNER JOIN type
                ON pokemon.type_id = type.id
                WHERE trainer_id = $1`;
  const { rows } = await inventoryPool.query(SQL, [trainer_id]);
  return rows;
}

async function insertNewPokemon(name, attack, defense, trainer_id, type_name) {
  const { rows } = await inventoryPool.query(
    "SELECT * FROM type WHERE name = $1",
    [type_name],
  );

  const typeId =
    rows[0]?.id ??
    (
      await inventoryPool.query(
        "INSERT INTO type (name) VALUES ($1) RETURNING id",
        [type_name],
      )
    ).rows[0].id;

  await inventoryPool.query(
    "INSERT INTO pokemon (name, attack, defense, trainer_id, type_id) VALUES ($1, $2, $3, $4, $5)",
    [name, attack, defense, trainer_id, typeId],
  );
}

async function updatePokemonById(
  pokemon_id,
  new_name,
  attack,
  defense,
  type_name,
) {
  const typeResults = await inventoryPool.query(
    "SELECT id FROM type WHERE name = $1",
    [type_name],
  );

  const typeId = typeResults.rows[0].id;
  const SQL =
    "UPDATE pokemon SET name = $1, attack = $2, defense = $3, type_id = $4 WHERE id = $5";
  await inventoryPool.query(SQL, [
    new_name,
    attack,
    defense,
    typeId,
    pokemon_id,
  ]);
}

async function getPokemonWithNoTrainer() {
  const SQL = ` SELECT pokemon.id as pokemon_id, pokemon.name, attack, defense, type.name AS type_name FROM pokemon 
                INNER JOIN type
                ON pokemon.type_id = type.id
                WHERE trainer_id IS NULL`;
  const { rows } = await inventoryPool.query(SQL);
  return rows;
}

async function updatePokemonOwner(new_trainer_id, pokemon_id) {
  const SQL = `UPDATE pokemon SET trainer_id = $1 WHERE id = $2`;
  await inventoryPool.query(SQL, [new_trainer_id, pokemon_id]);
}

async function deletePokemonById(pokemon_id) {
  const SQL = "DELETE FROM pokemon WHERE id =  $1";
  await inventoryPool.query(SQL, [pokemon_id]);
}

async function getAllTypes() {
  const SQL = "SELECT * FROM type";
  const { rows } = await inventoryPool.query(SQL);
  return rows;
}

export default {
  getAllPokemon,
  getPokemonById,
  getOwnerIdByPokemonId,
  getAllPokemonByTrainerId,
  insertNewPokemon,
  updatePokemonById,
  getPokemonWithNoTrainer,
  updatePokemonOwner,
  deletePokemonById,
  getAllTypes,
};
