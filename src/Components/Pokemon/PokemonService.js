import Parse from "parse";

// function to get all Pokemon
export const getPokemons = () => {
  const Pokemon = Parse.Object.extend("Pokemon");
  const query = new Parse.Query(Pokemon);
  return query
    .find()
    .then((results) => {
      return results.map((item) => ({
        id: item.id,
        name: item.get("Name"),
        type: item.get("Type"),
        location: item.get("Location"),
      }));
    })
    .catch((error) => {
      console.log("Error fetching Pokémon: ", error);
    });
};

// function to create new Pokemon
export const createPokemon = (name, type, location) => {
  const Pokemon = Parse.Object.extend("Pokemon");
  const pokemon = new Pokemon();
  pokemon.set("Name", name);
  pokemon.set("Type", type);
  pokemon.set("Location", location);
  return pokemon.save().then((result) => {
    return result;
  });
};

// function to delete Pokemon by ID
export const deletePokemon = (id) => {
  const Pokemon = Parse.Object.extend("Pokemon");
  const query = new Parse.Query(Pokemon);
  return query
    .get(id)
    .then((pokemon) => {
      return pokemon.destroy();
    })
    .catch((error) => {
      console.log("Error deleting Pokémon: ", error);
    });
};

