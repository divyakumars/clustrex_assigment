import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../../api";
import "./Auth.css"; // Create this file

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);

    const res = await api.register({ username, email, password });

    if (res && res.token) {
      setToken(res.token);
      navigate("/products");
    } else {
      setError(res?.error || "Registration failed");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={submit} className="auth-form">
          <input
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <input
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-btn">Register</button>

          <div className="auth-switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}
