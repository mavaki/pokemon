import React from "react";
import { Link } from "react-router-dom";
import "./Navigate.css";

const Navigate = () => {
  return (
    <nav className="navbar">
      <Link to="/pokemon">Pokémon</Link>
      <Link to="/trainer">Trainer</Link>
    </nav>
  );
};

export default Navigate;
