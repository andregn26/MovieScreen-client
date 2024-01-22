import React from "react";
import { useContext } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { UserContext } from "../../context/user.context";
import { MdFavorite } from "react-icons/md";
import "animate.css";

export const MovieHeader = ({ movie, removeMovie, addMovie, userFavourites, userInSession, movieId }) => {
	const { isLoggedIn } = useContext(UserContext);

	return (
		<article className="w-full">
			{/* IMAGE AND RATING */}
			<div className="relative w-full ">
				<img
					src={`${
						movie.backdrop_path
							? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
							: "https://cdn.pixabay.com/photo/2019/04/12/19/24/film-35mm-4122924_1280.jpg"
					}`}
					alt="coverposter"
					className="object-cover h-64 lg:h-96 w-full object-top filter saturate-[75%] brightness-50"
				/>
				<div className="min-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-0 flex items-center  flex-col md:flex-row gap-8 bg-base-200 shadow-lg w-[90%] max-w-screen-lg py-10 px-8  rounded-xl">
					<div className="hidden md:inline-block">
						<img
							src={`${
								movie.poster_path
									? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
									: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
							}`}
							alt="movieposter"
							className=" rounded-sm"
						/>
					</div>
					<div className="w-full h-full flex flex-col">
						<div className="flex justify-between text-sm md:justify-start md:gap-8">
							<p>★ {movie.vote_average.toFixed(1)}</p>
							<p>{movie.runtime} mins</p>
						</div>

						<h2 className="text-center text-3xl mt-4 md:text-left">{movie.title}</h2>
						<p className="text-center text-xs mt-2 md:text-left">{movie.release_date}</p>
						<p className="text-center text-sm text-base-content/80 italic mt-1 md:text-left">
							{movie.tagline}
						</p>
						<p className="text-sm mt-4 text-center md:text-left">{movie.overview}</p>
						<ul className="flex flex-wrap gap-4 justify-center my-8 md:justify-start">
							{movie.genres &&
								movie.genres.map((genre) => {
									return (
										<li
											className="badge badge-outline badge-primary text-xs"
											key={genre.id}>
											{genre.name}
										</li>
									);
								})}
						</ul>
						<div className="join mx-auto md:mx-0">
							<button className="btn btn-primary join-item">See on IMDB</button>
							{!userFavourites.includes(movie.id) ? (
								<button
									disabled={!isLoggedIn}
									onClick={addMovie}
									className="btn btn-success join-item">
									<MdFavoriteBorder />
								</button>
							) : (
								<button
									disabled={!isLoggedIn}
									onClick={() => removeMovie(movieId, userInSession)}
									className="btn btn-primary btn-error join-item">
									<MdFavorite />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};
