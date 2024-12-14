import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigate.css";

const Navigate = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/pokemon" className="nav-link" activeClassName="active-link">
          Pokemon
        </NavLink>
        <NavLink to="/trainer" className="nav-link" activeClassName="active-link">
          Trainer
        </NavLink>
        <NavLink to="/pokedex" className="nav-link" activeClassName="active-link">
          Pokedex
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigate;

