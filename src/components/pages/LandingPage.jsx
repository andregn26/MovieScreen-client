import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { randomReviews, getUpcomingMovies, trendingWeekMovies, getTopRated, getPopularMovies, getInTheatres, randomSix } from "../../api";
import Container from "../../components/templates/Container";
import TrendingMovies from "../molecules/CarouselTrendingMovies";
import CarouselSection from "../organisms/CarouselSection";
import CommentsSection from "../organisms/CommentsSection";
import ButtonAuth from "../atoms/ButtonAuth";
import { UserContext } from "../../context/user.context";
import UserSample from "../organisms/UserSample";

export const LandingPage = () => {
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [isLoadingTrendingMovies, setIsLoadingTrendingMovies] = useState(false);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [isLoadingUpcomingMovies, setIsLoadingUpcomingMovies] = useState(false);
	const [popularMovies, setPopularMovies] = useState([]);
	const [isLoadingPopularMovies, setIsLoadingPopularMovies] = useState(false);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [isLoadingTopRatedMovies, setIsLoadingTopRatedMovies] = useState(false);
	const [inTheatres, setInTheatres] = useState([]);
	const [isLoadingInTheatres, setIsLoadingInTheatres] = useState(false);
	const [sampleReviews, setSampleReviews] = useState([]);
	const [randomUsers, setRandomUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const { isLoggedIn } = useContext(UserContext);

	// TRENDING MOVIES
	useEffect(() => {
		setIsLoadingTrendingMovies(true);
		const timerId = setTimeout(() => {
			(async () => {
				const findTrending = await trendingWeekMovies();
				setTrendingMovies(findTrending.data.results);
				setIsLoadingTrendingMovies(false);
			})();
		}, 1000);
		return () => clearTimeout(timerId);
	}, []);

	// UPCOMING MOVIES
	useEffect(() => {
		setIsLoadingUpcomingMovies(true);
		const timerId = setTimeout(() => {
			(async () => {
				const findUpcoming = await getUpcomingMovies();
				setUpcomingMovies(findUpcoming.data.results);
				setIsLoadingUpcomingMovies(false);
			})();
		}, 1000);
		return () => clearTimeout(timerId);
	}, []);

	// POPULAR MOVIES
	useEffect(() => {
		setIsLoadingPopularMovies(true);
		const timerId = setTimeout(() => {
			(async () => {
				const findTopRated = await getPopularMovies();
				setPopularMovies(findTopRated.data.results);
				setIsLoadingPopularMovies(false);
			})();
		}, 1000);
		return () => clearTimeout(timerId);
	}, []);

	// TOP RATED MOVIES
	useEffect(() => {
		setIsLoadingTopRatedMovies(true);
		const timerId = setTimeout(() => {
			(async () => {
				const findTopRated = await getTopRated();
				setTopRatedMovies(findTopRated.data.results);
				setIsLoadingTopRatedMovies(false);
			})();
		}, 1000);
		return () => clearTimeout(timerId);
	}, []);

	// TOP IN THEATRES
	useEffect(() => {
		setIsLoadingInTheatres(true);
		const timerId = setTimeout(() => {
			(async () => {
				const findTopRated = await getInTheatres();
				setInTheatres(findTopRated.data.results);
				setIsLoadingInTheatres(false);
			})();
		}, 1000);
		return () => clearTimeout(timerId);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const sixUsers = await randomSix();
			setRandomUsers(sixUsers.data.slice(0, 4));
			const reviews = await randomReviews();
			setSampleReviews(reviews.data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<Container className="mb-24">
			<div className="max-w-screen-lg flex flex-col items-center gap-8 lg:gap-16 lg:flex-row" id="hero">
				<div className="h-full max-w-screen-sm flex flex-col">
					<h1 className="w-full heading-1  text-center lg:text-left">
						Connect with people who share the passion for the seventh art
					</h1>
					{isLoggedIn ? null : (
						<>
							<div className="flex gap-2">
								<ButtonAuth cta="Login" href="/login" />
								<ButtonAuth className="btn-outline" cta="Sign Up" href="/signup" />
							</div>
						</>
					)}
				</div>
				<div className="w-full overflow-hidden">
					<TrendingMovies isLoading={isLoadingTrendingMovies} data={trendingMovies} />
				</div>
			</div>
			<UserSample data={randomUsers} isLoading={isLoading} />
			<CommentsSection data={sampleReviews} isLoading={isLoading} />
			<CarouselSection title={"Upcoming"} data={upcomingMovies} isLoading={isLoadingUpcomingMovies} />
			<CarouselSection title={"Most Popular"} data={popularMovies} isLoading={isLoadingPopularMovies} />
			<CarouselSection title={"Top Rated"} data={topRatedMovies} isLoading={isLoadingTopRatedMovies} />
			<CarouselSection title={"In Theatres"} data={inTheatres} isLoading={isLoadingInTheatres} />
		</Container>
	);
};
