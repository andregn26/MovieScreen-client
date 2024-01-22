import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import ButtonAuth from "../atoms/ButtonAuth";
import Container from "../templates/Container";
import { useEffect } from "react";

export const SectionMovieReviews = ({ movieReviews, setMovieReviews }) => {
	useEffect(() => {
		setMovieReviews([]);
	}, [setMovieReviews]);

	const { isLoggedIn } = useContext(UserContext);
	return (
		<>
			<h3 className="heading-3">
				{movieReviews.length >= 1 ? <>Reviews from our users</> : <>Be the first to review this movie!</>}{" "}
			</h3>

			{movieReviews.map((review) => {
				return (
					<article
						key={review._id}
						className=""
						style={{
							display: "flex",
							flexDirection: "column",
							marginTop: "20px",
							padding: "10px",
						}}>
						<div
							style={{
								width: "60%",
								display: "flex",
								flexDirection: "column",
								alignSelf: "center",
								flexWrap: "wrap",
								marginTop: "20px",
							}}>
							{review.author.username && review.author.profileImg && (
								<Link
									to={`/profile/${review.author.username}`}
									style={{
										textDecoration: "none",
										color: "whitesmoke",
										width: "20%",
									}}>
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											marginBottom: "10px",
											width: "200px",
										}}>
										<img
											src={review.author.profileImg}
											alt="profilepicture"
											style={{
												width: "30px",
												height: "30px",
												borderRadius: "50%",
											}}
										/>
										<p style={{ marginLeft: "10px", marginTop: "5px" }}>
											{review.author.username}
										</p>
									</div>
								</Link>
							)}
							<p style={{ color: "gold" }}>
								★ <b>{review.rating}</b> <small>/10</small>
							</p>
							<p style={{ textAlign: "center" }}>
								<i>"{review.review}"</i>
							</p>
							<p style={{ textAlign: "center" }}>
								<small>{format(review.createdAt)}</small>
							</p>
						</div>
					</article>
				);
			})}

			{!isLoggedIn ? (
				<div className="w-full flex flex-col items-center mt-6">
					<p>Register or login to comment movies</p>
					<div className="flex gap-4 mt-4 ">
						<ButtonAuth cta="Login" href="/login" />
						<ButtonAuth className="btn-outline" cta="Sign Up" href="/signup" />
					</div>
				</div>
			) : null}
		</>
	);
};
