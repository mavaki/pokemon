import React, { useState, useEffect } from "react";
import { getPokemons, createPokemon, deletePokemon } from "./PokemonService";
import pokemonData from "../../data/pokemonData.json"; // For autocomplete suggestions
import "./Pokemon.css";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]); // State to hold Pokémon from Back4App
  const [newName, setNewName] = useState(""); // State for Pokémon name
  const [newType, setNewType] = useState(""); // State for Pokémon type
  const [newLocation, setNewLocation] = useState(""); // State for Pokémon location

  // Fetch Pokémon from Back4App on component mount
  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    const fetchedPokemons = await getPokemons();
    setPokemons(fetchedPokemons);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNewName(value);

    // Autofill type if an exact match is found in the Pokédex
    const matchedPokemon = pokemonData.find(
      (pokemon) => pokemon.Name.toLowerCase() === value.toLowerCase()
    );
    if (matchedPokemon) {
      setNewType(matchedPokemon.Type);
    } else {
      setNewType(""); // Clear type if no match
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newName.trim() && newType.trim() && newLocation.trim()) {
      await createPokemon(newName, newType, newLocation); // Save to Back4App
      loadPokemons(); // Refresh the Pokémon list
      setNewName(""); // Clear the input fields
      setNewType("");
      setNewLocation("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="pokemon-container">
      <div className="form-container">
        <h3>Submit New Pokémon</h3>
        <form onSubmit={handleSubmit}>
          {/* Pokémon Name Input with Basic Dropdown */}
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter Pokémon Name"
            list="pokemon-suggestions"
            required
          />
          {/* Suggestions Dropdown */}
          <datalist id="pokemon-suggestions">
            {pokemonData.map((pokemon, index) => (
              <option key={index} value={pokemon.Name} />
            ))}
          </datalist>

          {/* Pokémon Type Input (Autofill Enabled) */}
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Enter Pokémon Type"
            required
          />

          {/* Pokémon Location Input */}
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter Location Found"
            required
          />

          <button type="submit">Add Pokémon</button>
        </form>
      </div>

      <div className="list-container">
        <h3>Pokémon List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>{pokemon.name}</td>
                <td>{pokemon.type}</td>
                <td>{pokemon.location}</td>
                <td>
                  <button onClick={() => deletePokemon(pokemon.id).then(loadPokemons)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pokemon;

