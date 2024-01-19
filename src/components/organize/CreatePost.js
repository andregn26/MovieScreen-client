import React from "react";
import { createPost, upload } from "../../api";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user.context";
import { toast } from "react-toastify";
import "./CreatePost.scss";

export const CreatePost = ({ addPost }) => {
	const { user } = useContext(UserContext);
	const [image, setImage] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		let posterImage;

		if (image) {
			const uploadData = new FormData();
			uploadData.append("file", image);
			const response = await upload(uploadData);
			posterImage = response.data.fileUrl;
		}

		let post = {
			author: user._id,
			poster: posterImage,
			content: content,
			likes: [],
			comments: [],
		};
		const response = await createPost({ post });
		addPost(response.data);
		toast.success("Posted!");
		setContent("");
		setImage("");
	};
	return (
		<div className="row-create-post">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: "30px",
				}}>
				<form
					className="form-create-post"
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
					}}>
					<input type="file" onChange={(e) => setImage(e.target.files[0])} />
					<textarea
						cols="30"
						rows="5"
						value={content}
						placeholder="What's on your mind?"
						onChange={(e) => setContent(e.target.value)}></textarea>
					<button type="submit">Post</button>
				</form>
			</div>
		</div>
	);
};
