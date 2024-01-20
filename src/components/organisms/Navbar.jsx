import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import Logo from "../atoms/Logo";
import Avatar from "../molecules/Avatar";
import InputSearch from "../atoms/InputSearch";

export const Navbar = ({ filterMovieList, query }) => {
	const { isLoggedIn, user, logoutUser } = useContext(UserContext);

	return (
		<header id="header" className="navbar bg-base-300/80 w-full flex justify-between shadow-lg px-8 z-50">
			<Logo />
			<div className={`${isLoggedIn ? "gap-6" : ""} flex`}>
				<div className="form-control">
					<InputSearch placeholder="Search" onChange={filterMovieList} value={query} />
				</div>
				<div className="">{isLoggedIn ? <Avatar user={user} logoutUser={logoutUser} /> : null}</div>
			</div>
		</header>
	);
};
