import React, { useState, useEffect } from "react";
import { getPokemons, createPokemon, deletePokemon } from "./PokemonService";
import "./Pokemon.css";
import { Link } from "react-router-dom"; // import Link

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]); // state to hold Pokemon data
  const [newName, setNewName] = useState(""); // state for name
  const [newType, setNewType] = useState(""); // state for type
  const [newLocation, setNewLocation] = useState(""); // state for location

  useEffect(() => {
    loadPokemons(); // load Pokemon data
  }, []);

  const loadPokemons = () => {
    getPokemons().then((fetchedPokemons) => {
      setPokemons(fetchedPokemons); // update state data
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() && newType.trim() && newLocation.trim()) {
      createPokemon(newName, newType, newLocation).then(() => {
        loadPokemons(); // refresh list after adding Pokemon
        setNewName("");
        setNewType("");
        setNewLocation("");
      });
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDelete = (id) => {
    deletePokemon(id).then(() => {
      loadPokemons(); // refresh list after deletion
    });
  };

  // duplicate data into form
  const handleDuplicate = (pokemon) => {
    setNewName(pokemon.name);
    setNewType(pokemon.type);
    setNewLocation(pokemon.location);
  };

  return (
    <div className="pokemon-container">
      {/* navigation link to Trainer page */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/trainer">
          <button>Go to Trainer Page</button>
        </Link>
      </div>

      <div className="form-container">
        <h3>Submit New Pokémon</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter Pokémon Name"
            required
          />
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Enter Pokémon Type"
            required
          />
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
                  <button onClick={() => handleDelete(pokemon.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleDuplicate(pokemon)}>
                    Duplicate
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
