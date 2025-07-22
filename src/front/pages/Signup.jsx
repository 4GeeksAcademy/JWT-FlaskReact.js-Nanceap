import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async e => {
		e.preventDefault();
		setMessage(null);
		setError(null);

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (response.ok) {
				setMessage("User registered successfully");
				setTimeout(() => navigate("/login"), 2000);
			} else {
				setError(data.msg || "Registration failed");
			}
		} catch (err) {
			setError("An error occurred");
		}
	};

	return (
		<div className="container mt-5">
			<h2>Signup</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Register</button>
			</form>
			{message && <div className="alert alert-success mt-3">{message}</div>}
			{error && <div className="alert alert-danger mt-3">{error}</div>}
		</div>
	);
};
 


