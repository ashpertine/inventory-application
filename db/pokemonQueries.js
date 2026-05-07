import { inventoryPool } from "./pool.js";

async function getAllPokemon() {
  const SQL = "SELECT * FROM pokemon";
  const { rows } = await inventoryPool.query(SQL);
  return rows;
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

  const typeId = typeResults.rows[0];
  const SQL =
    "UPDATE pokemon SET name = $1, attack = $2, defense = $3, type_name = $4 WHERE id = $5";
  await inventoryPool.query(SQL, [
    new_name,
    attack,
    defense,
    type_name,
    pokemon_id,
  ]);
}

async function deletePokemonById(pokemon_id) {
  const SQL = "DELETE FROM pokemon WHERE id =  $1";
  await inventoryPool.query(SQL, [pokemon_id]);
}

export default {
  getAllPokemon,
  getAllPokemonByTrainerId,
  insertNewPokemon,
  updatePokemonById,
  deletePokemonById,
};
