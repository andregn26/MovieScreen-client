import React from "react";
import { getFeed } from "../../../api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user.context";
import { CreatePost } from "../../organize/CreatePost";
import { Post } from "../../organize/Post";

export const Feed = () => {
	const { user } = useContext(UserContext);
	const [feed, setFeed] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const isMountedRef = useRef(null);

	const addPost = (post) => {
		setFeed([post, ...feed]);
	};

	const removePost = (post) => {
		const newFeed = feed.filter((removed) => {
			return removed._id !== post;
		});
		setFeed(newFeed);
	};

	const addLike = (postId, userId) => {
		const newFeed = [...feed];
		const postToLike = newFeed.find((post) => post._id === postId);
		postToLike.likes = postToLike.likes.concat(userId);

		setFeed(newFeed);
	};

	const removeLike = (postId, userId) => {
		const newFeed = [...feed];
		const postToLike = newFeed.find((post) => post._id === postId);
		postToLike.likes = postToLike.likes.filter((user) => user !== userId);

		setFeed(newFeed);
	};

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			// isMountedRef.current = true;

			const userFeed = await getFeed(user.username);
			let sortedFeed = userFeed.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			setFeed(sortedFeed);
			setIsLoading(false);
			// const socket = socketIOClient(process.env.REACT_APP_PROJECTS_API);
			// socket.on("newPost", (newPost) => {
			//   if (isMountedRef.current) {
			//     setFeed((feed) => {
			//       return feed.concat(newPost);
			//     });
			//   }
			// });
		})();
	}, [user]);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<CreatePost addPost={addPost} />

			<section>
				{isLoading && (
					<div
						style={{
							height: "600px",
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							opacity: "0.8",
						}}>
						<svg className="spinner" viewBox="0 0 50 50">
							<circle
								className="path"
								cx="25"
								cy="25"
								r="20"
								fill="none"
								strokeWidth="5"></circle>
						</svg>
					</div>
				)}
				{feed &&
					feed.map((post) => {
						return (
							<Post
								removePost={removePost}
								removeLike={removeLike}
								addLike={addLike}
								key={post._id}
								post={post}
							/>
						);
					})}
			</section>
		</div>
	);
};
