import { logIn } from "../../../api";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/user.context";

import React from "react";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);

	const { storeToken, authenticateUser } = useContext(UserContext);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await logIn({ email, password });
			storeToken(response.data.authToken);
			authenticateUser();
			navigate(`/`);
		} catch (error) {
			setMessage(error.response.data.message);
		}
	};

	return (
		<div class="container pt-20 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
			<div class="glassmorphism px-6 py-8 rounded-xl shadow-md text-primary-300 w-full">
				<h1 class="mb-8 text-3xl text-center">Log In</h1>
				<form onSubmit={handleSubmit} className="flex flex-col items-center">
					{/* email */}
					<input
						type="text"
						class="input w-full max-w-xs mb-4 bg-base-300"
						name="email"
						placeholder="Email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{/* password */}
					<input
						type="password"
						class="input w-full max-w-xs mb-4 bg-base-300"
						name="password"
						placeholder="Password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button type="submit" class="btn btn-accent btn-wide">
						Log In
					</button>
					{message && <p style={{ color: "red", textAlign: "center", fontSize: "1.2rem" }}>{message}</p>}
				</form>
			</div>

			<div class="text-grey-dark mt-6">
				Don't have an account?
				<Link to="/signup" class="no-underline border-b border-blue text-blue">
					Sign Up
				</Link>
				.
			</div>
		</div>
	);
};
