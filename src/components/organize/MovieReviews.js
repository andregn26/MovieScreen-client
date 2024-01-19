import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "animate.css";

export const MovieReviews = ({ movieReviews }) => {
	return (
		<>
			{movieReviews.length >= 1 ? (
				<div style={{ textAlign: "center" }}>
					<h3 className="ff-sans-cond fs-700">Reviews from our users:</h3>
				</div>
			) : (
				<div style={{ textAlign: "center" }}>
					<h3 className="ff-sans-cond fs-700">Be the first to review this movie!</h3>
				</div>
			)}

			{movieReviews.map((review) => {
				return (
					<article
						key={review._id}
						className="animate__animated animate__fadeIn"
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
		</>
	);
};
