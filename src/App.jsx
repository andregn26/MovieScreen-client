import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// auth
import { Signup } from "./components/pages/auth/Signup";
import { Login } from "./components/pages/auth/Login";
import { IsPrivate } from "./components/atoms/IsPrivate";
// user
import { Profile } from "./components/pages/user/Profile";
import { EditUser } from "./components/pages/user/EditUser";
import { UserReviews } from "./components/pages/user/UserReviews";
import { UserFollowing } from "./components/pages/user/UserFollowing";
import { UserFollowers } from "./components/pages/user/UserFollowers";
// movie
import { MovieDetails } from "./components/pages/movie/MovieDetails";
// feed
import { searchMovie } from "./api";
import { FindFriends } from "./components/pages/feed/FindFriends";
import { Feed } from "./components/pages/feed/Feed";
import { CreatePost } from "./components/organize/CreatePost";
import { Post } from "./components/organize/Post";
// landing
import { Navbar } from "./components/organisms/Navbar";
import { LandingPage } from "./components/pages/LandingPage";
import Footer from "./components/organisms/Footer";
import MovieSearchModal from "./components/molecules/MovieSearchModal";

function App() {
	const [searchedMovies, setSearchedMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoadingSearch, setIsLoadingSearch] = useState(false);

	const filterMovieList = (e) => {
		setSearchQuery(e.target.value);

		if (e.target.value === "") {
			setSearchedMovies([]);
		}
		setIsLoadingSearch(true);

		setTimeout(() => {
			(async () => {
				let movieFound = await searchMovie(e.target.value);
				setSearchedMovies(movieFound.data.results);
				setIsLoadingSearch(false);
			})();
		}, 1500);
	};

	const cleanUp = () => {
		setSearchedMovies([]);
		setSearchQuery("");
	};
	return (
		<div className={`relative  text-base-content ${searchQuery ? "overflow-hidden h-screen" : ""}`}>
			<div className="w-screen min-h-screen fixed flex justify-center pt-32 px-6 pb-40 pointer-events-none">
				<div className="gradient"></div>{" "}
			</div>
			<Navbar filterMovieList={filterMovieList} query={searchQuery} />
			<main className={` relative  w-full flex flex-col items-center justify-center align-middle`}>
				{searchQuery && (
					<MovieSearchModal movie={searchedMovies} cleanUp={cleanUp} isLoadingSearch={isLoadingSearch} />
				)}

				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/find-friends" element={<FindFriends />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/feed/:username"
						element={
							<Feed>
								<CreatePost />
								<Post />
							</Feed>
						}
					/>
					<Route path="/profile/:username" element={<Profile />} />
					<Route path="/:username/followers" element={<UserFollowers />} />
					<Route path="/:username/following" element={<UserFollowing />} />
					<Route
						path="/profile/:username/edit"
						element={
							<IsPrivate>
								<EditUser />
							</IsPrivate>
						}
					/>
					<Route path="/profile/:username/reviews" element={<UserReviews />} />
					<Route path="/movies/:movieId" element={<MovieDetails />} />
				</Routes>
			</main>
			<Footer />

			<ToastContainer />
		</div>
	);
}

export default App;
