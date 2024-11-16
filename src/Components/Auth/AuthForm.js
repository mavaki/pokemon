import React from "react";

const AuthForm = ({ user, isLogin, onChange, onSubmit, disabled }) => (
  <form onSubmit={onSubmit} autoComplete="off">
    {!isLogin && (
      <>
        <label>First Name</label>
        <input
          type="text"
          value={user.firstName}
          onChange={onChange}
          name="firstName"
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          value={user.lastName}
          onChange={onChange}
          name="lastName"
          required
        />
      </>
    )}
    <label>Email</label>
    <input
      type="email"
      value={user.email}
      onChange={onChange}
      name="email"
      required
    />
    <label>Password</label>
    <input
      type="password"
      value={user.password}
      onChange={onChange}
      name="password"
      required
    />
    <button type="submit" disabled={disabled}>
      Submit
    </button>
  </form>
);

export default AuthForm;
