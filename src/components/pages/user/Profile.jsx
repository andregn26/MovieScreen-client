import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUser, removeFromFavourites, followUser, unfollowUser } from "../../../api";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/user.context";
import { toast } from "react-toastify";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { FavouritesCard } from "../../molecules/FavouritesCard";

export const Profile = () => {
	const { user } = useContext(UserContext);
	const { username } = useParams();
	const [newUser, setUser] = useState({});
	const [favList, setFavList] = useState([]);
	const [userFollowers, setUserFollowers] = useState([]);
	const [renderAgain, setRenderAgain] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const foundUser = await getUser(username);
			const followersId = foundUser.data.followers.map((userId) => {
				return userId._id;
			});
			setUserFollowers(followersId);
			setUser(foundUser.data);
			setIsLoading(false);
		})();
	}, [username, renderAgain]);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			setFavList(newUser.favourites);
			setIsLoading(false);
		})();
	}, [newUser.favourites]);

	const removeMovie = async (movieId, user) => {
		await removeFromFavourites(movieId, user);

		const movieRemoved = favList.filter((movie) => {
			return movie.id === movieId;
		});

		const newList = favList.filter((movie) => {
			return movie.id !== movieId;
		});

		setFavList(newList);
		toast.warning(`${movieRemoved[0].title} was removed from favourites`);
	};

	const handleFollow = async (name) => {
		await followUser(name, { user });
		setRenderAgain(!renderAgain);
		toast.success(`You're following ${newUser.username}`);
	};

	const handleUnfollow = async (name) => {
		await unfollowUser(name, { user });
		setRenderAgain(!renderAgain);
		toast.warn(`You're unfollowing ${newUser.username}`);
	};

	//Styles
	const socialComponentLinksStyle = " text-xs btn btn-ghost";

	return (
		<section id="page-profile" className=" w-full px-8 md:px-12  xl:px-16 mt-24">
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
						<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
					</svg>
				</div>
			)}
			<div className=" w-full relative flex flex-col items-center lg:items-start gap-8 lg:grid lg:grid-cols-12  lg:gap-16">
				<div className="w-full lg:col-span-5 xl:sticky xl:top-20 ">
					<div className="relative bg-base-200/75 p-8 md:p-16 rounded-3xl  shadow-xl flex flex-col gap-4  text-neutral-300 ">
						<div
							id="social-component"
							className=" w-full flex justify-center xl:justify-end   bg-secondary/5 absolute top-0 left-0 rounded-t-3xl py-4 px-8 ">
							{newUser.followers && (
								<>
									<Link
										to={`/profile/${newUser.username}/reviews`}
										className={`${socialComponentLinksStyle}`}>
										<p>{newUser.reviews.length}</p>
										<p>Reviews</p>
									</Link>
									<Link
										to={`/${newUser.username}/followers`}
										className={`${socialComponentLinksStyle}`}>
										<p>{newUser.followers.length}</p>
										<p>Followers</p>
									</Link>
									<Link
										to={`/${newUser.username}/following`}
										className={`${socialComponentLinksStyle}`}>
										<p>{newUser.follows.length}</p>
										<p>Following</p>
									</Link>
								</>
							)}
						</div>

						<div
							id="profile-img-and-user-info"
							className="w-full flex flex-col gap-4 lg:gap-12 xl:flex-row mt-20 ">
							<div id="profile-img" className=" ">
								{newUser && userFollowers && (
									<>
										<div className="flex flex-col gap-4 items-center">
											<div className="avatar">
												<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
													<img
														src={newUser.profileImg}
														alt="profile"
													/>
												</div>
											</div>
											{user && user.username === newUser.username && (
												<Link
													to={`/profile/${newUser.username}/edit`}
													className="">
													<div className=" badge badge-primary">
														Edit
													</div>
												</Link>
											)}
											{user && user.username !== newUser.username && (
												<div>
													{!userFollowers.includes(
														user._id
													) ? (
														<button
															onClick={() =>
																handleFollow(
																	newUser.username
																)
															}
															className="btn btn-ghost btn-sm">
															<FaUserPlus className="text-primary text-xl" />
														</button>
													) : (
														<button
															onClick={() =>
																handleUnfollow(
																	newUser.username
																)
															}
															className="btn btn-ghost btn-sm">
															<FaUserCheck className="text-primary text-xl" />
														</button>
													)}
												</div>
											)}
										</div>
									</>
								)}
							</div>

							<div id="user-info" className=" w-full text-center xl:text-left">
								<h3 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
									{newUser.username}
								</h3>
								<p className="font-semibold leading-8 tracking-wider">
									From {newUser.country}
								</p>
								<p className="block text-sm text-neutral-300">{newUser.about}</p>
							</div>
						</div>

						<div
							id="favorite-movies"
							className=" w-full flex gap-4 flex-wrap mt-6 justify-center xl:justify-start">
							{newUser.genres && newUser.genres.length >= 1 && (
								<>
									{newUser.genres.map((genre, index) => {
										return (
											<div
												key={index}
												className="badge badge-outline badge-primary">
												{genre}
											</div>
										);
									})}
								</>
							)}
						</div>
					</div>
				</div>
				<div className="relative w-full lg:col-span-7">
					<div className="grid grid-cols-2  sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{favList && favList.length > 0 ? (
							<FavouritesCard
								removeMovie={removeMovie}
								favList={favList}
								user={user}
								newUser={newUser}
							/>
						) : (
							<div className="col-span-2 sm:col-span-4 lg:col-span-3 xl:grid-col-span-4 min-h-[300px] w-full flex justify-center items-center heading-4 text-center">
								{username} doesn't have any favorites.
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
