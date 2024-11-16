import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useAuth } from "./AuthContext";

const AuthLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      alert("You are already logged in");
      navigate("/pokemon");
    }
  }, [isAuthenticated, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userLoggedIn = await loginUser(currentUser);
      if (userLoggedIn) {
        alert(`Welcome back, ${userLoggedIn.get("firstName")}!`);
        setIsAuthenticated(true); // update AuthContext
        navigate("/pokemon"); // redirect to Pokemon
      }
    } catch (error) {
      // error handled in AuthService
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      user={currentUser}
      isLogin={true}
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
      disabled={isSubmitting}
    />
  );
};

export default AuthLogin;
