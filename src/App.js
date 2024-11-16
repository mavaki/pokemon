// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthModule from "./Components/Auth/Auth"; // Ensure correct path
import AuthRegister from "./Components/Auth/AuthRegister";
import AuthLogin from "./Components/Auth/AuthLogin";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import Pokemon from "./Components/Pokemon/Pokemon";
import Trainer from "./Components/Trainer/Trainer";
import { APPLICATION_ID, JAVASCRIPT_KEY, SERVER_URL } from "./environment";
import Parse from "parse";
import AuthContextProvider from "./Components/Auth/AuthContext"; // Ensure correct path

// Initialize Parse with your credentials
Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
Parse.serverURL = SERVER_URL;

function App() {
  return (
    <AuthContextProvider>
      <Router>
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

          {/* Redirect Root to /pokemon */}
          <Route path="/" element={<Navigate to="/pokemon" replace />} />

          {/* Wildcard Route */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
