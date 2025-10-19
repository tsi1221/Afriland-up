import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // added success state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Login successful! Redirecting...");
        // redirect after a short delay to show green message
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to continue your Afriland journey
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />

            <div className="login-forgot">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
          </form>

          <p className="login-register">
            Don’t have an account? <a href="/register"> Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 