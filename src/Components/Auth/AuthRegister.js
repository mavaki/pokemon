import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useAuth } from "./AuthContext";

const AuthRegister = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      alert("You are already logged in");
      navigate("/pokemon");
    }
  }, [isAuthenticated, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userCreated = await createUser(newUser);
      if (userCreated) {
        alert(`${userCreated.get("firstName")}, you successfully registered!`);
        setIsAuthenticated(true); // update AuthContext
        navigate("/pokemon"); // redirect to Pokemkon
      }
    } catch (error) {
      // error handled in AuthService
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      user={newUser}
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
      disabled={isSubmitting}
    />
  );
};

export default AuthRegister;
