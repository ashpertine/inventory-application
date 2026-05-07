import pokemonQueries from "../db/pokemonQueries.js";
import trainerQueries from "../db/trainerQueries.js";

async function getAllPokemonByTrainerIdView(req, res) {
  const trainerId = req.params.trainerId;
  const trainerResults = await trainerQueries.getTrainerById(trainerId);
  const trainerExists = trainerResults.length > 0;
  if (trainerExists) {
    try {
      const results = await pokemonQueries.getAllPokemonByTrainerId(trainerId);
      res.render("pokemongroup", { trainerId, pokemon: results });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).render("trainer404", { trainerId });
  }
}

async function insertNewPokemonPost(req, res) {
  const trainerId = req.body.trainer_id;
  const pokemonName = req.body.pokemon_name;
  const pokemonTypeName = req.body.type;
  const attack = req.body.attack;
  const defense = req.body.defense;

  try {
    await pokemonQueries.insertNewPokemon(
      pokemonName,
      attack,
      defense,
      trainerId,
      pokemonTypeName,
    );
    return res.redirect(`/pokemon/from/${trainerId}`);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deletePokemonPost(req, res) {
  const pokemonId = req.params.pokemonId;
  const trainerId = req.body.trainer_id;
  try {
    await pokemonQueries.deletePokemonById(pokemonId);
    return res.redirect(`/pokemon/from/${trainerId}`);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default {
  getAllPokemonByTrainerIdView,
  insertNewPokemonPost,
  deletePokemonPost,
};
