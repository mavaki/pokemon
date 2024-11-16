import React, { createContext, useContext, useState, useEffect } from "react";
import { checkUser, logoutUser } from "./AuthService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // handle async user check
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // authenticate user
    const verifyUser = async () => {
      try {
        const userIsAuthenticated = await checkUser();
        setIsAuthenticated(userIsAuthenticated);
      } catch (error) {
        console.log("Error verifying user:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
