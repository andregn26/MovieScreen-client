import React from "react";
import { NavLink } from "react-router-dom";

const Logo = () => {
	return (
		<>
			<NavLink to="/" className="md:hidden text-lg xl:text-xl font-bold">
				MS
			</NavLink>
			<NavLink to="/" className="hidden md:block text-lg xl:text-xl font-bold">
				MovieScreen
			</NavLink>
		</>
	);
};

export default Logo;
