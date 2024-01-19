import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { randomReviews, getUpcomingMovies, trendingWeekMovies, getTopRated, getPopularMovies, getInTheatres, randomSix } from "../../api";
import Container from "../../components/templates/Container";
import TrendingMovies from "../molecules/CarouselTrendingMovies";
import CarouselSection from "../organisms/CarouselSection";
import CommentsSection from "../organisms/CommentsSection";

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

	// TRENDING MOVIES
	useEffect(() => {
		setIsLoadingTrendingMovies(true);
		const timerId = setTimeout(() => {
			(async () => {
				const findTrending = await trendingWeekMovies();
				setTrendingMovies(findTrending.data.results);
				setIsLoadingTrendingMovies(false);
			})();
		}, 2000);
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
		}, 4000);
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
		}, 4000);
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
		}, 4000);
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
		}, 4000);
		return () => clearTimeout(timerId);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const sixUsers = await randomSix();
			setRandomUsers(sixUsers.data.slice(0, 4));
			setIsLoading(false);
		})();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const reviews = await randomReviews();
			setSampleReviews(reviews.data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<Container className="">
			<div className="max-w-screen-lg flex flex-col items-center gap-8 lg:gap-16 lg:flex-row" id="hero">
				<div className="h-full max-w-screen-sm flex flex-col">
					<h1 className="w-full heading-1  text-center lg:text-left">
						Connect with people who share the passion for the seventh art
					</h1>
				</div>
				<div className="w-full overflow-hidden">
					<TrendingMovies isLoading={isLoadingTrendingMovies} data={trendingMovies} />
				</div>
			</div>
			<section className="w-full mt-36 flex flex-col justify-center items-center">
				<h2 className="heading-2">Join our fast-growing community!</h2>
				<div className="flex gap-8" style={{ marginTop: "40px" }}>
					{randomUsers.length >= 1 &&
						randomUsers.map((user) => {
							return (
								<article key={user._id} className="w-24 h-24 rounded-full overflow-hidden">
									<Link to={`/profile/${user.username}`}>
										<img
											className="object-cover h-24 w-24"
											src={user.profileImg}
											alt="userimage"
										/>
									</Link>
								</article>
							);
						})}
				</div>
			</section>
			<CommentsSection data={sampleReviews} />
			<CarouselSection title={"Upcoming"} data={upcomingMovies} isLoading={isLoadingUpcomingMovies} />
			<CarouselSection title={"Most Popular"} data={popularMovies} isLoading={isLoadingPopularMovies} />
			<CarouselSection title={"Top Rated"} data={topRatedMovies} isLoading={isLoadingTopRatedMovies} />
			<CarouselSection title={"In Theatres"} data={inTheatres} isLoading={isLoadingInTheatres} />
		</Container>
	);
};
