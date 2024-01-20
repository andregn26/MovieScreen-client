import { Link } from "react-router-dom";

const UserSample = ({ data }) => {
	return (
		<section className="w-full mt-36 flex flex-col justify-center items-center text-center">
			<h2 className="heading-2">Join our fast-growing community!</h2>
			<div className="flex gap-8 flex-wrap justify-center mt-12">
				{data.length >= 1 &&
					data.map((user) => {
						return (
							<article key={user._id} className="w-24 h-24 rounded-full overflow-hidden">
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
			</div>
		</section>
	);
};

export default UserSample;
