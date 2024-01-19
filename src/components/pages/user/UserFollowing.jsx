import React, { useState, useEffect } from "react";
import { getFollowing } from "../../../api";
import { Link, useParams } from "react-router-dom";
import UserNavigationHeader from "../../organisms/UserNavigationHeader";
import Container from "../../../components/templates/Container";
import UserCard from "../../molecules/UserCard";

export const UserFollowing = () => {
	const { username } = useParams();
	const [userFollowing, setUserFollowing] = useState([]);

	useEffect(() => {
		(async () => {
			const following = await getFollowing(username);
			setUserFollowing(following.data.follows);
		})();
	}, [username]);

	return (
		<Container>
			<UserNavigationHeader username={username} type={"follows"} />
			{userFollowing && userFollowing.length > 0 ? (
				<div className="w-full grid grid-cols-6 lg:grid-cols-12 gap-8">
					{userFollowing.map((follow) => {
						return (
							<UserCard
								key={follow._id}
								user={follow}
								className="col-span-3 md:col-span-2 lg:col-span-3"
							/>
						);
					})}
				</div>
			) : (
				<div className="col-span-6 lg:col-span-12 min-h-[300px] w-full flex justify-center items-center heading-4">
					{username} doesn't follow anyone.
				</div>
			)}
		</Container>
	);
};
