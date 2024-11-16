import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthModule = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <Link to="/auth/register">
            <button>Register</button>
          </Link>
          <br />
          <Link to="/auth/login">
            <button>Login</button>
          </Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default AuthModule;
