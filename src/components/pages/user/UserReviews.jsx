import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserReviews, editReview, deleteReview } from "../../../api";
import Container from "../../../components/templates/Container";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/user.context";
import { FaWrench, FaTrashAlt, FaCheck } from "react-icons/fa";
import "animate.css";
import { format } from "timeago.js";
import UserNavigationHeader from "../../organisms/UserNavigationHeader";

export const UserReviews = () => {
	const { user } = useContext(UserContext);
	const [reviews, setReviews] = useState([]);
	const [editingMovie, setEditingMovie] = useState([]);
	const [isEditClicked, setIsEditClicked] = useState(false);
	const [renderAgain, setRenderAgain] = useState(false);

	const { username } = useParams();

	useEffect(() => {
		(async () => {
			const getReviews = await getUserReviews(username);
			setReviews(getReviews.data.reviews);
		})();
	}, [username, renderAgain]);

	const handleEdit = (reviewId) => {
		if (editingMovie.length === 0 || editingMovie._id !== reviewId) {
			const reviewToEdit = reviews.filter((rev) => {
				return rev._id === reviewId;
			});
			setEditingMovie(reviewToEdit[0]);
			setIsEditClicked(true);
		} else {
			setEditingMovie([]);
		}
	};

	console.log(isEditClicked);

	const handleSubmit = async (e, reviewId) => {
		e.preventDefault();
		await editReview(reviewId, { editingMovie });
		setEditingMovie([]);
		setRenderAgain(!renderAgain);
		toast.success("Review saved!");
		setIsEditClicked(false);
	};

	const handleDelete = async (reviewId) => {
		await deleteReview(reviewId);
		toast.error("Review deleted!");
		setIsEditClicked(false);
		setRenderAgain(!renderAgain);
	};

	return (
		<Container className={"mb-24"}>
			<UserNavigationHeader username={username} type={"reviews"} />

			<div className="w-full grid grid-cols-6 gap-8">
				{reviews && reviews.length > 0 ? (
					<>
						{reviews.map((review) => {
							return (
								<article
									key={review._id}
									className="relative col-span-6 sm:col-span-3 bg-base-300/80 overflow-hidden shadow-xl rounded-xl">
									<div id="imageposter">
										{review.movie.poster_path ? (
											<img
												src={`https://image.tmdb.org/t/p/w400${review.movie.poster_path}`}
												alt="poster"
												className="object-cover w-full h-full absolute top-0 z-[-1] "
											/>
										) : (
											<img
												src={
													"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
												}
												alt="poster"
												className="object-cover w-full h-full absolute top-0 z-[-1] "
											/>
										)}
									</div>
									<div className="h-full flex flex-col gap-8 px-4 py-6 lg:px-6 lg:py-8">
										<div id="name-title" className="flex flex-col gap-4">
											<h2 className="card-title">{review.movie.title}</h2>
											<p>★ {review.rating}/10</p>
										</div>

										<div id="form" className="grow">
											<div>
												{review._id !== editingMovie._id ? (
													<>
														<p className="italic text-sm text-gray-200">
															"{review.review}"
														</p>
														<p className="text-sm text-gray-300 text-right mt-4">
															{format(
																review.createdAt
															)}
														</p>
													</>
												) : (
													<div className="flex flex-col gap-2">
														<input
															required
															className="input"
															type="number"
															min="0"
															max="10"
															value={
																editingMovie.rating
															}
															onChange={(e) =>
																setEditingMovie(
																	{
																		...editingMovie,
																		rating: parseInt(
																			e
																				.target
																				.value
																		),
																	}
																)
															}
														/>
														<textarea
															className="textarea h-48"
															required
															value={
																editingMovie.review
															}
															onChange={(e) =>
																setEditingMovie(
																	{
																		...editingMovie,
																		review: e
																			.target
																			.value,
																	}
																)
															}></textarea>
													</div>
												)}
											</div>
										</div>

										<div id="btn-group" className="join">
											{user && user.username === username && (
												<>
													{!isEditClicked ? (
														<button
															onClick={() =>
																handleEdit(
																	review._id
																)
															}
															className="btn join-item">
															Edit
														</button>
													) : (
														<button
															disabled
															className="btn join-item">
															Edit
														</button>
													)}

													{review._id === editingMovie._id &&
														isEditClicked && (
															<button
																className="btn join-item"
																onClick={(
																	e
																) =>
																	handleSubmit(
																		e,
																		review._id
																	)
																}>
																Save
															</button>
														)}

													{editingMovie._id ===
														review._id && (
														<button
															onClick={() =>
																handleDelete(
																	review._id
																)
															}
															className="btn join-item">
															Delete
														</button>
													)}
												</>
											)}
										</div>
									</div>
								</article>
							);
						})}
					</>
				) : (
					<div className="col-span-12 min-h-[300px] w-full flex justify-center items-center heading-4">
						{username} didn't make any review, yet.
					</div>
				)}
			</div>
		</Container>
	);
};
