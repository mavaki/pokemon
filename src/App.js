import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Pokemon from "./Components/Pokemon/Pokemon";
import Trainer from "./Components/Trainer/Trainer";
import * as Env from "./environment";
import Parse from "parse";
import "./App.css"; // use CSS file

// initialize with credentials
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/trainer" element={<Trainer />} />
        </Routes>

        {/* nav bar */}
        <nav className="navbar">
          <Link to="/">Pokémon</Link>
          <Link to="/trainer">Trainer</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;

