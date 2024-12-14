import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const AuthModule = () => {
  return (
    <div className="auth-container">
      <h1>Welcome to the Pokémon Hub</h1>
      <p>You need to log in or register to access the Pokemon and Trainer pages.</p>
      <div className="auth-buttons">
        <Link to="/auth/register">
          <button className="auth-button">Register</button>
        </Link>
        <Link to="/auth/login">
          <button className="auth-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthModule;

