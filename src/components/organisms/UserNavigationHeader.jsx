import React from "react";
import { Link } from "react-router-dom";

const UserNavigationHeader = ({ username, type }) => {
	return (
		<div className="w-full flex flex-col sm:flex-row justify-between mb-8">
			<h2 className="heading-1">
				<span className="text-primary">{username}'s</span> {type}
			</h2>
			<Link to={`/profile/${username}`} className="btn btn-secondary">
				Go back
			</Link>
		</div>
	);
};

export default UserNavigationHeader;
