import React from "react";
import { NavLink } from "react-router-dom";

const ButtonAuth = ({ className = "", cta = "this is the cta", href }) => {
	return (
		<NavLink to={href} className={`${className} btn btn-primary`}>
			{cta}
		</NavLink>
	);
};

export default ButtonAuth;
