import { Link } from "react-router-dom";

const UserSample = ({ data, isLoading }) => {
	return (
		<section className="w-full mt-36 flex flex-col justify-center items-center text-center">
			<h2 className="heading-2">Join our fast-growing community!</h2>
			<div className="w-full flex gap-8 flex-wrap justify-center mt-12">
				{isLoading ? (
					<>
						<div className="skeleton bg-base-200 rounded-md min-h-36 w-full">
							<p>
								Due to restrictions in the free hosting plan, the database may take up to 30
								seconds to load
							</p>
						</div>
					</>
				) : (
					<>
						{data.length >= 1 &&
							data.map((user) => {
								return (
									<article
										key={user._id}
										className="w-24 h-24 rounded-full overflow-hidden">
										<Link to={`/profile/${user.username}`}>
											<img
												className="object-cover h-24 w-24"
												src={user.profileImg}
												alt="userimage"
											/>
										</Link>
									</article>
								);
							})}
					</>
				)}
			</div>
		</section>
	);
};

export default UserSample;
