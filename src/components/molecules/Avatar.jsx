import React from "react";
import { NavLink } from "react-router-dom";

const Avatar = ({ user, logoutUser }) => {
	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="avatar">
				<div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
					<img alt="Tailwind CSS Navbar component" src={`${user.profileImg}`} />
				</div>
			</div>
			<ul
				tabIndex={0}
				className="mt-6 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-300 flex gap-2 rounded-box w-52">
				<li>
					<NavLink
						to={`/profile/${user.username}`}
						className={({ isActive }) => (isActive ? "bg-accent-900 w-full" : "")}>
						Profile
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/feed/${user.username}`}
						className={({ isActive }) => (isActive ? "bg-accent-700 w-full" : "")}>
						Feed
					</NavLink>
				</li>
				<li>
					<div onClick={logoutUser}>Logout</div>
				</li>
			</ul>
		</div>
	);
};

export default Avatar;
