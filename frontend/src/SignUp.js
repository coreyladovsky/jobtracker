import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { signUp } from "./util/firebaseFunctions";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="authContainer">
      <h1>Sign Up Page</h1>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="error"></div>
      )}
      <form onSubmit={handleSubmit} className="authForm">
        <div className="inputContainer">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
            autoComplete="on"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login" className="switchAuth">
        {" "}
        Already have an account? Login
      </Link>
    </div>
  );
}
