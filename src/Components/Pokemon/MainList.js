import React from "react";

const MainList = ({ pokemons, deletePokemon, duplicatePokemon }) => {
  return (
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
              <button onClick={() => deletePokemon(pokemon.id)}>Delete</button>
              <button onClick={() => duplicatePokemon(pokemon)}>Duplicate</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainList;

