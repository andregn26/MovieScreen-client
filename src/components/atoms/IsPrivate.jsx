import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Navigate } from "react-router-dom";

import React from "react";

export const IsPrivate = ({ children }) => {
	const { isLoggedIn, isLoading } = useContext(UserContext);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	} else {
		return children;
	}
};
