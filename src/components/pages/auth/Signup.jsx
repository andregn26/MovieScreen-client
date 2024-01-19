import { signUp } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import React from "react";

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			setMessage(null);
			const accountCreated = await signUp({
				username,
				email,
				password,
			});
			setIsLoading(false);
			toast.success("A new account was created! Please log in.");
			navigate("/login");
			console.log(accountCreated);
		} catch (error) {
			setMessage(error.response.data.message);
		}
	};

	return (
		<>
			<div class="container  pt-20 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div class="glassmorphism px-6 py-8 rounded-xl shadow-md text-primary-300 w-full">
					<h1 class="mb-8 text-3xl text-center">Sign up</h1>
					<form onSubmit={handleSubmit} className="flex flex-col items-center">
						{/* username */}
						<input
							type="text"
							class="input w-full max-w-xs mb-4 bg-base-300"
							name="fullname"
							placeholder="Username"
							value={username}
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
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
							Create Account
						</button>
						{message && (
							<p style={{ color: "red", textAlign: "center", fontSize: "1.2rem" }}>{message}</p>
						)}
					</form>
				</div>

				<div class="text-grey-dark mt-6">
					Already have an account?
					<Link to="/login" class="no-underline border-b border-blue text-blue">
						Log in
					</Link>
					.
				</div>
			</div>
		</>
	);
};
