import React from "react";
import { useContext } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { UserContext } from "../../context/user.context";
import { FaImdb } from "react-icons/fa";
import "animate.css";

export const MovieHeader = ({ movie, removeMovie, addMovie, userFavourites, userInSession, movieId }) => {
	const { isLoggedIn } = useContext(UserContext);

	return (
		<article>
			{/* TITLE AND SHORT DESCRIPTION */}
			<div>
				<h1 className="ff-sans-cond fs-900 text-secondary-clr-medium-light">{movie.title}</h1>
				<h4>{movie.tagline}</h4>
			</div>
			{/* IMAGE AND RATING */}
			<div>
				<div>
					<p>★ {movie.vote_average}</p>
				</div>
				<div>
					{movie.backdrop_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
							alt="coverposter"
							className=""
						/>
					) : (
						<img
							src={"https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"}
							alt="coverposter"
						/>
					)}
				</div>
			</div>

			<div>
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

				<div>
					<p>{movie.overview}</p>
				</div>
			</div>
			<div>
				<div>
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
						<FaImdb />
					</a>

					<p>
						<small>Released: </small>
						{movie.release_date}
					</p>
				</div>
				<div style={{ width: "300px", alignSelf: "center", marginTop: "20px" }}>
					<ul>
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
