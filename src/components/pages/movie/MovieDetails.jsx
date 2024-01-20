import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
	getMovieDetails,
	getSimilarMovies,
	addToFavourites,
	movieReview,
	getUser,
	removeFromFavourites,
	getMovieReviews,
	getMovieCredits,
} from "../../../api";
import { UserContext } from "../../../context/user.context";
import { toast } from "react-toastify";
import { useContext } from "react";
import { MovieHeader } from "../../organisms/MovieHeader";
import { MovieCardXS } from "../../organize/MovieCardXS";
import { ReviewForm } from "../../organize/ReviewForm";
import { MovieReviews } from "../../organize/MovieReviews";
import { MovieCredits } from "../../organize/MovieCredits";
import "animate.css";

export const MovieDetails = () => {
	const { user, isLoggedIn } = useContext(UserContext);
	const { movieId } = useParams();
	const [movie, setMovie] = useState({});
	const [similarMovies, setSimilarMovies] = useState([]);
	const [review, setReview] = useState();
	const [rating, setRating] = useState();
	const [form, setForm] = useState(false);
	const [userInSession, setUserInSession] = useState({});
	const [userFavourites, setUserFavourites] = useState([]);
	const [moreSimilar, setMoreSimilar] = useState(false);
	const [movieReviews, setMovieReviews] = useState([]);
	const [movieCast, setMovieCast] = useState([]);
	const [movieCrew, setMovieCrew] = useState([]);
	const [moreCast, setMoreCast] = useState(false);
	const [moreCrew, setMoreCrew] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const userData = await getUser(user.username);
			setUserInSession(userData.data);

			const favDataId = userData.data.favourites.map((movie) => {
				return movie.id;
			});

			setUserFavourites(favDataId);
			setIsLoading(false);
		})();
	}, [user]);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const getDetails = await getMovieDetails(movieId);
			setMovie(getDetails.data);
			setIsLoading(false);
		})();
	}, [movieId]);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const movieReviewsFromDb = await getMovieReviews(movie.id);
			setMovieReviews(movieReviewsFromDb.data.reviews);
			setIsLoading(false);
		})();
	}, [movie]);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const creditsFromApi = await getMovieCredits(movieId);
			setMovieCast(creditsFromApi.data.cast);
			setMovieCrew(creditsFromApi.data.crew);
			setIsLoading(false);
		})();
	}, [movieId]);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const getSimilar = await getSimilarMovies(movieId);
			setSimilarMovies(getSimilar.data.results);
			setIsLoading(false);
		})();
	}, [movieId]);

	const addMovie = (e) => {
		e.preventDefault();
		addToFavourites(movie);
		setUserFavourites([...userFavourites, movie.id]);
		toast.success(`${movie.title} was added to favourites`);
	};

	const removeMovie = async (movieId, user) => {
		await removeFromFavourites(movieId, user);

		const filteredFav = userFavourites.filter((movie) => {
			return movie !== parseInt(movieId);
		});
		setUserFavourites([...filteredFav]);

		toast.warning(`${movie.title} was removed from favourites`);
	};

	const handleForm = () => {
		form ? setForm(false) : setForm(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const fullReview = {
			review,
			rating,
			author: user._id,
			title: movie.title,
			genres: movie.genres,
			poster_path: movie.poster_path,
			tagline: movie.tagline,
			overview: movie.overview,
			vote_average: movie.vote_average,
			release_date: movie.release_date,
			runtime: movie.runtime,
			id: movie.id,
			imdb_id: movie.imdb_id,
		};
		await movieReview(movieId, fullReview);
		setMovieReviews([...movieReviews, fullReview]);
		setForm(false);
		setReview();
		setRating();
		setIsLoading(false);
		toast.success("Your rating was submited");
	};

	return (
		<div>
			{movie.id === Number(movieId) ? (
				<>
					<section>
						<>
							<MovieHeader
								movie={movie}
								removeMovie={removeMovie}
								addMovie={addMovie}
								userFavourites={userFavourites}
								userInSession={userInSession}
								movieId={movieId}
							/>
						</>
					</section>

					<section>
						<h3 className="heading-3">Cast</h3>
						{!moreCast ? (
							<>
								<div>
									<MovieCredits movieCast={movieCast.slice(0, 8)} />
									<button
										className="btn-background"
										onClick={() => setMoreCast(!moreCast)}>
										+
									</button>
								</div>
							</>
						) : (
							<>
								<div>
									<MovieCredits movieCast={movieCast.slice(0, 20)} />
									<button onClick={() => setMoreCast(!moreCast)} className="">
										-
									</button>
								</div>
							</>
						)}

						<h3>Crew:</h3>
						{!moreCrew ? (
							<>
								<div>
									<MovieCredits movieCrew={movieCrew.slice(0, 8)} />
									<button
										onClick={() => setMoreCrew(!moreCrew)}
										className="btn-background">
										+
									</button>
								</div>
							</>
						) : (
							<>
								<div>
									<MovieCredits movieCrew={movieCrew.slice(0, 20)} />
									<button
										onClick={() => setMoreCrew(!moreCrew)}
										className="btn-background">
										-
									</button>
								</div>
							</>
						)}
					</section>

					<section>
						{movieReviews && <MovieReviews movieReviews={movieReviews} />}
						{isLoggedIn && (
							<ReviewForm
								handleForm={handleForm}
								form={form}
								handleSubmit={handleSubmit}
								rating={rating}
								setRating={setRating}
								review={review}
								setReview={setReview}
							/>
						)}
					</section>

					<section>
						{!moreSimilar ? (
							<>
								<h3>You might also like:</h3>
								<MovieCardXS similarMovies={similarMovies.slice(0, 8)} />
								<p onClick={() => setMoreSimilar(!moreSimilar)}>show more...</p>
							</>
						) : (
							<>
								<h3>You might also like:</h3>
								<MovieCardXS similarMovies={similarMovies} />
								<p onClick={() => setMoreSimilar(!moreSimilar)}>hide</p>
							</>
						)}
					</section>
				</>
			) : (
				<p>Movie doesn't exist</p>
			)}
		</div>
	);
};
