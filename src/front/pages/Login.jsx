import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await resp.json();
      if (resp.ok) {
        sessionStorage.setItem("token", data.token);
        navigate("/private");
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError("Error logging in");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <input type="email" name="email" className="form-control my-2" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" className="form-control my-2" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
};


