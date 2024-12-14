// PokemonGrid.js
import React, { useState, useEffect } from "react";
import "./PokemonGrid.css";

const PokemonGrid = ({ pokemonData }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [generationFilter, setGenerationFilter] = useState("");
  const [filteredData, setFilteredData] = useState(pokemonData);

  useEffect(() => {
    let data = pokemonData;

    if (search) {
      data = data.filter((pokemon) =>
        pokemon.Name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (typeFilter) {
      data = data.filter((pokemon) =>
        pokemon.Type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    if (generationFilter) {
      data = data.filter(
        (pokemon) => pokemon.Generation === Number(generationFilter)
      );
    }

    setFilteredData(data);
  }, [search, typeFilter, generationFilter, pokemonData]);

  // names that are weird in csv
  const nameMapping = {
    "Minior red meteor": "minior",
    "Mimikyu disguised": "mimikyu",
  };

  // replace spaces with hyphens
  const fetchPokemonImage = (name) => {
    const formattedName = nameMapping[name] || name.toLowerCase().replace(/ /g, "-");
    return `https://img.pokemondb.net/sprites/home/normal/${formattedName}.png`;
  };


  return (
    <div className="pokemon-grid-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by generation"
          value={generationFilter}
          onChange={(e) => setGenerationFilter(e.target.value)}
        />
      </div>

      <div className="pokemon-grid">
        {filteredData.map((pokemon, index) => (
          <div className="pokemon-card" key={index}>
            <img
              src={fetchPokemonImage(pokemon.Name)}
              alt={pokemon.Name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            <h3>{pokemon.Name}</h3>
            <p>Type: {pokemon.Type}</p>
            <p>Generation: {pokemon.Generation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonGrid;

