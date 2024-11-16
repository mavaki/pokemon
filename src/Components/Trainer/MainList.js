import React from "react";

const TrainerList = ({ trainers }) => {
  return (
    <ul>
      {trainers.map((trainer) => (
        <li key={trainer.id}>
          <strong>Trainer Name:</strong> {trainer.name} <br />
          <strong>Assigned Pokémon:</strong> {trainer.pokemon}
        </li>
      ))}
    </ul>
  );
};

export default TrainerList;
