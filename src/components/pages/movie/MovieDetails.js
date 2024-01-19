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
import { MovieDetailCard } from "../../organize/MovieDetailCard";
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
			<section className="animate__animated animate__fadeIn">
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

				{movie && (
					<>
						<MovieDetailCard
							movie={movie}
							removeMovie={removeMovie}
							addMovie={addMovie}
							userFavourites={userFavourites}
							userInSession={userInSession}
							movieId={movieId}
						/>
					</>
				)}
			</section>
			<hr
				style={{
					width: "70%",
					backgroundColor: "plum",
					border: "1px solid plum ",
					marginTop: "100px",
					marginBottom: "100px",
				}}
			/>
			<section className="animate__animated animate__fadeInLeft">
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
				<h3
					className="ff-sans-cond fs-700"
					style={{
						textAlign: "center",
						marginBottom: "20px",
						marginTop: "40px",
					}}>
					Cast:
				</h3>
				{!moreCast ? (
					<>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<MovieCredits movieCast={movieCast.slice(0, 8)} />
							<button
								className="btn-background"
								onClick={() => setMoreCast(!moreCast)}
								style={{
									fontSize: "1.5rem",
									border: "none",
									borderRadius: "0 10px 10px 0",
									paddingLeft: "10px",
									paddingRight: "10px",
									textAlign: "center",
									color: "whitesmoke",
									width: "50px",
									height: "260px",
								}}>
								+
							</button>
						</div>
					</>
				) : (
					<>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<MovieCredits movieCast={movieCast.slice(0, 20)} />
							<button
								onClick={() => setMoreCast(!moreCast)}
								className="btn-background"
								style={{
									fontSize: "1.5rem",
									border: "none",
									borderRadius: "0 10px 10px 0",
									paddingLeft: "10px",
									paddingRight: "10px",
									textAlign: "center",
									color: "whitesmoke",
									width: "50px",
									height: "260px",
								}}>
								-
							</button>
						</div>
					</>
				)}

				<h3
					className="ff-sans-cond fs-700"
					style={{
						textAlign: "center",
						marginBottom: "20px",
						marginTop: "60px",
					}}>
					Crew:
				</h3>
				{!moreCrew ? (
					<>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<MovieCredits movieCrew={movieCrew.slice(0, 8)} />
							<button
								onClick={() => setMoreCrew(!moreCrew)}
								className="btn-background"
								style={{
									fontSize: "1.5rem",
									border: "none",
									borderRadius: "0 10px 10px 0",
									paddingLeft: "10px",
									paddingRight: "10px",
									textAlign: "center",
									color: "whitesmoke",
									width: "50px",
									height: "260px",
								}}>
								+
							</button>
						</div>
					</>
				) : (
					<>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<MovieCredits movieCrew={movieCrew.slice(0, 20)} />
							<button
								onClick={() => setMoreCrew(!moreCrew)}
								className="btn-background"
								style={{
									fontSize: "1.5rem",
									border: "none",
									borderRadius: "0 10px 10px 0",
									paddingLeft: "10px",
									paddingRight: "10px",
									textAlign: "center",
									color: "whitesmoke",
									width: "50px",
									height: "260px",
								}}>
								-
							</button>
						</div>
					</>
				)}
			</section>
			<hr
				style={{
					width: "70%",
					backgroundColor: "plum",
					border: "1px solid plum ",
					marginTop: "100px",
					marginBottom: "100px",
				}}
			/>
			<section style={{ marginTop: "50px" }} className="animate__animated animate__fadeIn">
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
			<hr
				style={{
					width: "70%",
					backgroundColor: "plum",
					border: "1px solid plum ",
					marginTop: "100px",
					marginBottom: "100px",
				}}
			/>
			<section
				className="animate__animated animate__fadeInLeft"
				style={{
					display: "flex",
					flexDirection: "column",
					marginTop: "50px",
				}}>
				{!moreSimilar ? (
					<>
						<h3 className="ff-sans-cond fs-700" style={{ textAlign: "center" }}>
							You might also like:
						</h3>
						<MovieCardXS similarMovies={similarMovies.slice(0, 8)} />
						<p
							onClick={() => setMoreSimilar(!moreSimilar)}
							style={{
								alignSelf: "center",
								textAlign: "center",
								color: "grey",
								marginTop: "5px",
								marginBottom: "50px",
							}}>
							show more...
						</p>
					</>
				) : (
					<>
						<h3 className="fs-700 ff-sans-cond" style={{ textAlign: "center" }}>
							You might also like:
						</h3>

						<MovieCardXS similarMovies={similarMovies} />
						<p
							style={{
								alignSelf: "center",
								textAlign: "center",
								color: "grey",
								marginTop: "5px",
								marginBottom: "50px",
							}}
							onClick={() => setMoreSimilar(!moreSimilar)}>
							hide
						</p>
					</>
				)}
			</section>
		</div>
	);
};
