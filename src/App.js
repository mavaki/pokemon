// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navigate/Navigate"; // Import Navbar
import AuthModule from "./Components/Auth/Auth";
import AuthRegister from "./Components/Auth/AuthRegister";
import AuthLogin from "./Components/Auth/AuthLogin";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import Pokemon from "./Components/Pokemon/Pokemon";
import Trainer from "./Components/Trainer/Trainer";
import PokemonGrid from "./Components/PokemonGrid/PokemonGrid";
import pokemonData from "./data/pokemonData.json"; // Assuming JSON format is correct
import AuthContextProvider from "./Components/Auth/AuthContext";
import Parse from "parse";

// Initialize Parse with the provided credentials
Parse.initialize(
  "LzyjOiiJBaeMvCvZadRJ5kd0BH1JXGUwfsVrSbUI", // APPLICATION_ID
  "STdRYe3oBlJUjtjJ2b3ehhzWS0VUxrr6avgpQ2C9" // JAVASCRIPT_KEY
);
Parse.serverURL = "https://parseapi.back4app.com/";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar /> {/* Navbar appears on all pages */}
        <Routes>
          {/* Authentication Routes */}
          <Route path="/auth" element={<AuthModule />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />

          {/* Protected Routes */}
          <Route
            path="/pokemon"
            element={<ProtectedRoute element={<Pokemon />} />}
          />
          <Route
            path="/trainer"
            element={<ProtectedRoute element={<Trainer />} />}
          />

          {/* Pokedex Route */}
          <Route path="/pokedex" element={<PokemonGrid pokemonData={pokemonData} />} />

          {/* Redirect Root to /pokedex */}
          <Route path="/" element={<Navigate to="/pokedex" replace />} />

          {/* Wildcard Route */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

