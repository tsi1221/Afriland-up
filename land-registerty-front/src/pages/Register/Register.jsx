import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const CardanoIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
    <path d="M12 8.5L9 11.5 12 14.5 15 11.5zM12 14.5L9 17.5 15 17.5z" opacity="0.8" />
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    wallet: "",
    password: "",
    confirmPassword: "",
    role: "seller",
    landCard: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "landCard") {
      setFormData({ ...formData, landCard: e.target.files[0] });
    } 
    else 
      {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("city", formData.city);
      data.append("email", formData.email);
      data.append("walletAddress", formData.wallet);
      data.append("password", formData.password);
      data.append("role", formData.role);
      if (formData.landCard) data.append("landCard", formData.landCard);

      const res = await axios.post("http://localhost:5000/api/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Registration successful!");
      console.log("Token:", res.data.token);
      // You can store token in localStorage for future authenticated requests
      localStorage.setItem("token", res.data.token);

      // Reset form
      setFormData({
        name: "",
        city: "",
        email: "",
        wallet: "",
        password: "",
        confirmPassword: "",
        role: "seller",
        landCard: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-logo">
          <CardanoIcon className="cardano-icon" />
          <h1>Welcome to Afriland</h1>
          <p>Register to start your decentralized land journey</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Accra" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="wallet">Cardano Wallet Address</label>
              <input type="text" id="wallet" name="wallet" value={formData.wallet} onChange={handleChange} placeholder="addr1qddr1qx..." required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="landCard">Land Card Certificate (.pdf)</label>
              <input type="file" id="landCard" name="landCard" accept=".pdf" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="form-row form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <select name="role" id="role" value={formData.role} onChange={handleChange}>
              <option value="seller">as Seller</option>
              <option value="buyer">as Buyer</option>
              <option value="both">as Both</option>
            </select>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>

        <div className="signin-link">
          Already have an account? <a href="/login">login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
