import { useState, useEffect } from "react";
import { randomReviews, getUpcomingMovies, trendingWeekMovies, getTopRated, getPopularMovies, getInTheatres, randomSix } from "../api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Container from "../components/containers/Container";
import TrendingMovies from "../components/carousel/TrendingMovies";
import LandingCarouselMovies from "../components/carousel/LandingCarouselMovies";

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
	// const [threeReviews, setThreeReviews] = useState([]);
	// const [randomUsers, setRandomUsers] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);

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

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	(async () => {
	// 		const sixUsers = await randomSix();
	// 		setRandomUsers(sixUsers.data.slice(0, 4));
	// 		setIsLoading(false);
	// 	})();
	// }, []);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	(async () => {
	// 		const reviews = await randomReviews();
	// 		setThreeReviews(reviews.data);
	// 		setIsLoading(false);
	// 	})();
	// }, []);

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

			<div id="upcoming-movies" className=" w-full mt-24">
				<h2 className="heading-3">Upcoming</h2>
				<div className="w-full ">
					<LandingCarouselMovies isLoading={isLoadingUpcomingMovies} data={upcomingMovies} />
				</div>
			</div>

			<div id="popular-movies" className=" w-full mt-24">
				<h2 className="heading-3">Most Popular</h2>
				<div className="w-full ">
					<LandingCarouselMovies isLoading={isLoadingPopularMovies} data={popularMovies} />
				</div>
			</div>

			<div id="topRated-movies" className=" w-full mt-24">
				<h2 className="heading-3">Top Rated</h2>
				<div className="w-full ">
					<LandingCarouselMovies isLoading={isLoadingTopRatedMovies} data={topRatedMovies} />
				</div>

				<div id="inTheatres-movies" className=" w-full mt-24">
					<h2 className="heading-3">In Theatres</h2>
					<div className="w-full ">
						<LandingCarouselMovies isLoading={isLoadingInTheatres} data={inTheatres} />
					</div>
				</div>
			</div>

			{/* 
      <section
        className="bg-secondary-clr-medium-light text-primary-clr-dark container-section background"
        style={{ marginTop: "60px" }}
      >
        <div className="container section-container">
          <h1 className="padding center ff-sans-cond fs-800 text-white">
            We love Cinema
          </h1>
          {threeReviews && (
            <>
              {threeReviews.map((review) => {
                return (
                  <div
                    className="container-review animate__animated animate__fadeInLeft"
                    key={review._id}
                  >
                    <p className="title">
                      <small>
                        {review.author.username}
                        <br /> about
                        <strong> {review.movie.title}</strong>
                      </small>
                    </p>
                    <p>
                      <i>"{review.review}"</i>
                    </p>

                    <p className="rating fs-700">
                      <strong>★ {review.rating}</strong>
                      <small> /10</small>
                    </p>
                    <div>
                      <p>
                        <br />
                        <small>{format(review.createdAt)}</small>
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>

      <section className=" bg-dark" style={{ marginTop: "60px" }}>
        <div className="container section-container">
          <h1 className="fs-800 center text-white padding ff-sans-cond ">
            And our users too!
          </h1>
          <div className="container-user" style={{ marginTop: "40px" }}>
            {randomUsers.length >= 1 &&
              randomUsers.map((user) => {
                return (
                  <article
                    key={user._id}
                    className="animate__animated animate__fadeIn"
                  >
                    <Link to={`/profile/${user.username}`}>
                      <img
                        className="user-image"
                        src={user.profileImg}
                        alt="userimage"
                      />
                    </Link>
                  </article>
                );
              })}
          </div>
        </div>
      </section>
      
      */}
		</Container>
	);
};
