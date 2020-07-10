import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../util/firebaseFunctions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="authContainer">
      <h1>Login Page</h1>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="error"></div>
      )}
      <form onSubmit={handleSubmit} className="authForm">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          autoComplete="on"
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className="switchAuth">
        Need to sign up?
      </Link>
    </div>
  );
}
