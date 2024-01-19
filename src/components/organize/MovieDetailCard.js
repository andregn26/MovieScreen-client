import React from "react";
import { useContext } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { UserContext } from "../../context/user.context";
import { FaImdb } from "react-icons/fa";
import "animate.css";

export const MovieDetailCard = ({ movie, removeMovie, addMovie, userFavourites, userInSession, movieId }) => {
	const { isLoggedIn } = useContext(UserContext);

	return (
		<article
			style={{
				display: "flex",
				flexDirection: "column",
				marginTop: "30px",
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flexWrap: "wrap",
					marginBottom: "30px",
				}}>
				<h1
					className="ff-sans-cond fs-900 text-secondary-clr-medium-light"
					style={{
						textAlign: "center",
						paddingLeft: "10px",
						paddingRight: "10px",
					}}>
					{movie.title}
				</h1>
				<h4 style={{ textAlign: "center" }}>
					<i>{movie.tagline}</i>
				</h4>
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div>
					<p
						style={{
							position: "absolute",
							fontSize: "1.8rem",
							color: "gold",
							padding: "10px",
							textShadow: "1px 1px 1px black",
						}}>
						<b>★ {movie.vote_average}</b>
					</p>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "5px",
					}}>
					{movie.backdrop_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
							alt="coverposter"
							style={{ width: "600px" }}
						/>
					) : (
						<img
							src={"https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"}
							alt="coverposter"
							style={{ width: "600px" }}
						/>
					)}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}>
				{movie.poster_path ? (
					<img
						src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
						alt="movieposter"
						style={{
							width: "150px",
							height: "230px",
							marginTop: "-50px",
							borderRadius: "7px",
							boxShadow: "0px 0px 20px black",
						}}
					/>
				) : (
					<img
						src={
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
						}
						alt="movieposter"
						style={{
							width: "150px",
							height: "230px",
							marginTop: "-50px",
							borderRadius: "7px",
							boxShadow: "0px 0px 20px black",
						}}
					/>
				)}

				{isLoggedIn &&
					userFavourites &&
					(userFavourites.includes(movie.id) ? (
						<BsBookmarkHeartFill
							className="animate__animated animate__fadeIn"
							onClick={() => removeMovie(movieId, userInSession)}
							style={{
								fontSize: "3rem",
								color: "firebrick",
								marginTop: "-50px",
								marginLeft: "-169.5px",
								position: "absolute",
							}}
						/>
					) : (
						<BsBookmarkPlusFill
							className="animate__animated animate__fadeIn text-secondary-clr-medium-light"
							onClick={addMovie}
							style={{
								fontSize: "3rem",
								marginTop: "-50px",
								marginLeft: "-169.5px",
								position: "absolute",
								opacity: "0.5",
							}}
						/>
					))}

				<div
					style={{
						width: "225px",
						textAlign: "left",
						padding: "10px",
					}}>
					<p>{movie.overview}</p>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flexWrap: "wrap",
					marginTop: "20px",
				}}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						marginTop: "5px",
					}}>
					<p style={{ marginLeft: "10px" }}>
						<small>Duration: </small>
						{movie.runtime} mins
					</p>

					<a
						href={`https://www.imdb.com/title/${movie.imdb_id}/`}
						target="blank"
						style={{
							alignSelf: "center",
							padding: "10px",
							width: "50px",
							height: "50px",
						}}>
						<FaImdb
							style={{
								color: "whitesmoke",
								fontSize: "1.8rem",
								marginTop: "-15px",
							}}
						/>
					</a>

					<p style={{ marginRight: "10px" }}>
						<small>Released: </small>
						{movie.release_date}
					</p>
				</div>
				<div style={{ width: "300px", alignSelf: "center", marginTop: "20px" }}>
					<ul
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-around",
							marginLeft: "-35px",
							listStyle: "none",
						}}>
						{movie.genres &&
							movie.genres.map((genre) => {
								return (
									<li
										style={{
											border: "1px solid grey",
											borderRadius: "8px",
											paddingTop: "7px",
											paddingBottom: "7px",
											paddingLeft: "15px",
											paddingRight: "15px",
											textAlign: "center",
											color: "whitesmoke",
											marginTop: "10px",
										}}
										key={genre.id}>
										<p className="fs-600 ff-sans-cond">
											<small>
												<b>{genre.name}</b>
											</small>
										</p>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</article>
	);
};
