import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user, className }) => {
	return (
		<div className={`${className} relative bg-base-200/75 rounded-xl shadow-xl w-full min-h-4 mt-12 pt-12`}>
			<Link className="w-full" to={`/profile/${user.username}`}>
				<div className="avatar absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className="w-16 sm:w-20  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
						<img src={user.profileImg} alt="profile" />
					</div>
				</div>
				<div className="flex flex-col items-center my-4 gap-2">
					<h2 className="capitalize font-bold">{user.username}</h2>
				</div>
			</Link>
		</div>
	);
};

export default UserCard;
