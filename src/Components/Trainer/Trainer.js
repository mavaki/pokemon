import React, { useState, useEffect } from "react";
import { getTrainers, createTrainer, deleteTrainer } from "./TrainerService";
import "./Trainer.css";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]); // state to hold trainer data
  const [newName, setNewName] = useState(""); // state for name
  const [newExperience, setNewExperience] = useState(""); // state for experience

  useEffect(() => {
    loadTrainers(); // load trainers
  }, []);

  const loadTrainers = () => {
    getTrainers().then((fetchedTrainers) => {
      setTrainers(fetchedTrainers); // update state with trainers
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() && newExperience.trim()) {
      createTrainer(newName, newExperience).then(() => {
        loadTrainers(); // refresh list after adding trainer
        setNewName("");
        setNewExperience("");
      });
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDelete = (id) => {
    deleteTrainer(id).then(() => {
      loadTrainers(); // refresh list after deletion
    });
  };

  // duplicate data into form
  const handleDuplicate = (trainer) => {
    setNewName(trainer.name);
    setNewExperience(trainer.experience);
  };

  return (
    <div className="trainer-container">
      <div className="form-container">
        <h3>Submit New Trainer</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter Trainer Name"
          />
          <input
            type="number"
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)}
            placeholder="Enter Experience Level"
          />
          <button type="submit">Add Trainer</button>
        </form>
      </div>

      <div className="list-container">
        <h3>Trainer List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Experience Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id}>
                <td>{trainer.name}</td>
                <td>{trainer.experience}</td>
                <td>
                  <button onClick={() => handleDelete(trainer.id)}>Delete</button>
                  <button onClick={() => handleDuplicate(trainer)}>Duplicate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainer;

