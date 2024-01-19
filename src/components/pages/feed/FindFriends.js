import React from "react";
import { searchUsers, getUsersGenres, randomSix } from "../../../api";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/user.context";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FriendsSuggestions } from "../../organize/FriendsSuggestions";
import "./FindFriends.scss";

export const FindFriends = () => {
	const { user } = useContext(UserContext);
	const [users, setUsers] = useState([]);
	const [randomUsers, setRandomUsers] = useState([]);
	const [query, setQuery] = useState("");
	const [userGenres, setUserGenres] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			const usersSameGenres = await getUsersGenres(user.username);

			if (usersSameGenres.data.length) {
				setIsLoading(true);
				setUserGenres(usersSameGenres.data.slice(0, 6));
				setIsLoading(false);
			}

			if (!usersSameGenres.data.length) {
				const fiveRandomUsers = await randomSix();
				const filterUsers = fiveRandomUsers.data.filter((randomUser) => {
					return randomUser.username !== user.username;
				});
				setRandomUsers(filterUsers);
				setIsLoading(false);
			}
		})();
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (query === "") {
			setUsers([]);
		}

		const newQuery = query.toLowerCase().replace(" ", "");
		const usersInDb = await searchUsers(newQuery);
		const filterUser = usersInDb.data.filter((person) => {
			return person.username !== user.username;
		});

		setUsers(filterUser);
		setIsLoading(false);
	};

	const handleQuery = (e) => {
		setQuery(e.target.value);
		setIsLoading(true);
		if (query === "") {
			setUsers([]);
		}
		setTimeout(() => {
			handleSubmit(e);
			setIsLoading(false);
		}, 500);
	};

	return (
		<div className="container">
			<section>
				<div className="search__container">
					<div className="search__input">
						<input
							className="input-find-friends"
							name={query}
							type="text"
							onChange={(e) => handleQuery(e)}
							placeholder="Search by username"
						/>
						<FiSearch onClick={handleSubmit} />
					</div>
				</div>
				<div
					className="padding"
					style={{
						marginBottom: "4rem ",
					}}>
					{isLoading && (
						<div
							style={{
								height: "600px",
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								opacity: "0.8",
							}}>
							<svg className="spinner" viewBox="0 0 50 50">
								<circle
									className="path"
									cx="25"
									cy="25"
									r="20"
									fill="none"
									strokeWidth="5"></circle>
							</svg>
						</div>
					)}
					{users.length > 0 &&
						users.map((person) => {
							return (
								<Link to={`/profile/${person.username}`} style={{ textDecoration: "none" }}>
									<div
										className="secondary-clr-medium-light"
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											border: "1px solid grey",
											borderRadius: "1rem",
											padding: "0.5rem 0.5rem",
											margin: "0.3rem 0 ",
										}}
										key={person._id}>
										<img
											src={person.profileImg}
											alt="profilepic"
											style={{
												width: "80px",
												height: "80px",
												borderRadius: "50%",
												padding: "5px",
											}}
										/>
										<div
											className="text-secondary-clr-light "
											style={{
												textAlign: "right",
												padding: "5px 2rem 5px 0",
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
											}}>
											<h2>{person.username}</h2>
											<p>
												<small>{person.country}</small>
											</p>
										</div>
									</div>
								</Link>
							);
						})}
				</div>
			</section>
			<section>
				<div className="container-sugestions">
					{userGenres.length > 1 ? (
						<h2>People you may like based on your favourite movie genres:</h2>
					) : (
						<h2>People you may like:</h2>
					)}
					<div>
						<div className="container-grid">
							{userGenres && userGenres.length > 1
								? userGenres.map((user) => {
										return (
											<div className="center" key={user._id}>
												<FriendsSuggestions users={user} />
											</div>
										);
								  })
								: randomUsers.map((user) => {
										return (
											<div className="center" key={user._id}>
												<FriendsSuggestions users={user} />
											</div>
										);
								  })}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
