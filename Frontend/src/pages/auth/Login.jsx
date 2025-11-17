import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../../api";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ---------------- GOOGLE LOGIN HANDLER ----------------
  async function handleGoogleLoginSuccess(res) {
    const googleToken = res.credential; // Google returns this

    try {
      const backendRes = await api.googleAuth({ token: googleToken });

      if (backendRes.token) {
        setToken(backendRes.token);
        navigate("/products");
      } else {
        setError("Google login failed");
      }
    } catch (err) {
      console.log(err);
      setError("Google login error");
    }
  }

  // ---------------- NORMAL LOGIN HANDLER ----------------
  async function submit(e) {
    e.preventDefault();
    setError(null);

    const res = await api.login({ username, password });

    if (res && res.token) {
      setToken(res.token);
      navigate("/products");
    } else {
      setError(res?.error || "Invalid username or password");
    }
  }

  return (
    <div className="login-wrapper">

      {/* BRAND */}
      <div className="brand-container">
        <h1 className="shop-title">E-Shop</h1>
      </div>

      {/* LOGIN CARD */}
      <div className="login-card">
        <h2 className="login-title">Welcome 👋</h2>
        <p className="login-sub">Sign in to continue</p>

        <form onSubmit={submit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button className="btn-login" type="submit">
            Login
          </button>
        </form>

        {/* GOOGLE LOGIN BUTTON */}
        <div className="google-btn-wrap">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setError("Google Login Failed")}
          />
        </div>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <button className="link-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
