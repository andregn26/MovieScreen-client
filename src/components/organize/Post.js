import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
import { BsHeart, BsHeartFill, BsFillXCircleFill } from "react-icons/bs";
import { deletePost, likePost, dislikePost } from "../../api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import "animate.css";
import "./Post.scss";

export const Post = ({ post, addLike, removeLike, removePost }) => {
	const { user } = useContext(UserContext);

	const handleDelete = async (postId) => {
		await deletePost(postId);
		toast.warn("Post deleted!");
	};

	return (
		<div className="container-post">
			{post && (
				<article
					className="animate__animated animate__fadeIn"
					style={{
						marginTop: "50px",
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
					}}>
					<div
						className="post-top-container"
						// style={{
						//   width: "50%",
						//   display: "flex",
						//   flexDirection: "row",
						//   alignSelf: "center",
						// }}
					>
						<img
							src={post.author.profileImg}
							alt="profilepicture"
							style={{
								width: "40px",
								height: "40px",
								borderRadius: "50%",
							}}
						/>
						<Link
							to={`/profile/${post.author.username}`}
							style={{ textDecoration: "none", color: "whitesmoke" }}>
							<p style={{ marginLeft: "10px", marginTop: "8px" }}>
								<strong>{post.author.username}</strong>
							</p>
						</Link>
					</div>

					<img className="post-image" src={post.poster} alt="coverimage" />
					<div className="post-bottom-container">
						<div className="post-bottom-first-container">
							<p className="align-left">{post.content}</p>
							<p className="align-right">
								<small>
									<i>{format(post.createdAt)}</i>
								</small>
							</p>
						</div>

						<div className="post-bottom-second-container">
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
								}}>
								{!post.likes.includes(user._id) && (
									<BsHeart
										className="animate__animated animate__fadeIn"
										id="likeBtn"
										onClick={() => {
											addLike(post._id, user._id);
											likePost(post._id, user._id);
										}}
										style={{ fontSize: "1.2rem" }}
									/>
								)}

								{post.likes.includes(user._id) && (
									<BsHeartFill
										className="animate__animated animate__fadeIn"
										onClick={() => {
											removeLike(post._id, user._id);
											dislikePost(post._id, user._id);
										}}
										style={{ color: "red", fontSize: "1.2rem" }}
									/>
								)}
								{post.likes.length === 1 ? (
									<p style={{ marginLeft: "5px" }}>{post.likes.length} like</p>
								) : (
									<p style={{ marginLeft: "5px" }}>{post.likes.length} likes</p>
								)}
							</div>

							{user && (
								<>
									{user.username === post.author.username && (
										<BsFillXCircleFill
											style={{
												color: "red",
												fontSize: "1.2rem",
											}}
											onClick={() => {
												removePost(post._id);
												handleDelete(post._id);
											}}
										/>
									)}
								</>
							)}
						</div>

						<Comment postId={post._id} />
					</div>
				</article>
			)}
		</div>
	);
};
