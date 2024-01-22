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
import { CardMovie } from "../../molecules/CardMovie";
import { SectionReviewForm } from "../../organisms/SectionReviewForm";
import { SectionMovieReviews } from "../../organize/SectionMovieReviews";
import { CardMoviePerson } from "../../molecules/CardMoviePerson";
import Container from "../../templates/Container";

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
			const movieReviewsFromDb = await getMovieReviews(movieId);
			setMovieReviews(movieReviewsFromDb.data.reviews);
			setIsLoading(false);
		})();
	}, [movie, movieId]);

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
		<>
			{movie.id === Number(movieId) ? (
				<>
					<section className="w-full min-h-screen mb-24">
						<MovieHeader
							movie={movie}
							removeMovie={removeMovie}
							addMovie={addMovie}
							userFavourites={userFavourites}
							userInSession={userInSession}
							movieId={movieId}
						/>
					</section>
					<Container className="!mt-0">
						<h3 className="heading-3 text-center w-full">Cast</h3>
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 justify-center ">
							{!moreCast ? (
								<CardMoviePerson data={movieCast.slice(0, 8)} />
							) : (
								<CardMoviePerson data={movieCast.slice(0, 20)} />
							)}
						</div>
						<button className="btn btn-wide my-8" onClick={() => setMoreCast((prev) => !prev)}>
							{!moreCast ? <>+</> : <>-</>}
						</button>
					</Container>
					<Container className={"!mt-16"}>
						<h3 className="heading-3 text-center w-full">Crew</h3>
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 justify-center ">
							{!moreCrew ? (
								<CardMoviePerson data={movieCrew.slice(0, 8)} />
							) : (
								<CardMoviePerson data={movieCrew.slice(0, 20)} />
							)}
						</div>
						<button className="btn btn-wide my-8" onClick={() => setMoreCrew((prev) => !prev)}>
							{!moreCrew ? <>+</> : <>-</>}
						</button>
					</Container>
					<Container>
						<h3 className="heading-3 text-center w-full">You might also like</h3>
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 justify-center ">
							{!moreSimilar ? (
								<>
									<CardMovie data={similarMovies.slice(0, 8)} />
								</>
							) : (
								<>
									<CardMovie data={similarMovies} />
								</>
							)}
						</div>
						<button className="btn btn-wide my-8" onClick={() => setMoreSimilar((prev) => !prev)}>
							{!moreSimilar ? <>Show More</> : <>Hide</>}
						</button>
					</Container>
					<Container className={"mb-24"}>
						{movieReviews && (
							<SectionMovieReviews
								movieReviews={movieReviews}
								setMovieReviews={setMovieReviews}
							/>
						)}
						{isLoggedIn && (
							<SectionReviewForm
								handleForm={handleForm}
								form={form}
								handleSubmit={handleSubmit}
								rating={rating}
								setRating={setRating}
								review={review}
								setReview={setReview}
							/>
						)}
					</Container>
				</>
			) : (
				<p>Movie doesn't exist</p>
			)}
		</>
	);
};
