import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;
