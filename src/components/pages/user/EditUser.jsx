import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser, upload } from "../../../api";
import Select from "react-select";
import { toast } from "react-toastify";
import Container from "../../../components/templates/Container";
import UserNavigationHeader from "../../organisms/UserNavigationHeader";

export const EditUser = () => {
	const { username } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [country, setCountry] = useState("");
	const [about, setAbout] = useState("");
	const [image, setImage] = useState();
	const [newImage, setNewImage] = useState();
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		(async () => {
			const foundUser = await getUser(username);
			setUser(foundUser.data);
			setGenres(foundUser.data.genres);
			setCountry(foundUser.data.country);
			setAbout(foundUser.data.about);
			setImage(foundUser.data.profileImg);
		})();
	}, [username]);

	const options = [
		{ value: "Horror", label: "Horror" },
		{ value: "Comedy", label: "Comedy" },
		{ value: "Drama", label: "Drama" },
		{ value: "Science Fiction", label: "Science Fiction" },
		{ value: "Adventure", label: "Adventure" },
		{ value: "Animation", label: "Animation" },
		{ value: "Crime", label: "Crime" },
		{ value: "Documentary", label: "Documentary" },
		{ value: "Family", label: "Family" },
		{ value: "Fantasy", label: "Fantasy" },
		{ value: "History", label: "History" },
		{ value: "Music", label: "Music" },
		{ value: "Mistery", label: "Mistery" },
		{ value: "Romance", label: "Romance" },
		{ value: "Thriller", label: "Thriller" },
		{ value: "War", label: "War" },
		{ value: "Western", label: "Western" },
	];

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: "#18191b",
			border: state.isFocused ? "2px solid transparent" : "2px solid transparent",
			borderRadius: "4px",
			boxShadow: null,
			"&:hover": {
				borderColor: null,
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? "#18191b" : state.isFocused ? "#c2b382" : "#18191b",
			color: state.isSelected ? "#131415" : state.isFocused ? "#131415" : "#ebecf0",
			"&:hover": {
				backgroundColor: "#c2b382",
				color: "#131415",
			},
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#18191b",
			boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
			borderRadius: "4px",
		}),
		multiValue: (provided) => ({
			...provided,
			backgroundColor: "#c2b382",
			color: "#131415",
		}),
	};

	const handleGenres = (e) => {
		setGenres(e.map((x) => x.value));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let profileImg;

		if (newImage) {
			const uploadData = new FormData();
			uploadData.append("file", newImage);
			const response = await upload(uploadData);
			profileImg = response.data.fileUrl;
		} else {
			profileImg = image;
		}

		await updateUser(username, {
			genres,
			country,
			about,
			profileImg,
		});
		toast.success("User saved");
		navigate(`/profile/${username}`);
	};

	return (
		<Container>
			<UserNavigationHeader username={username} type={"edit profile"} />
			<div className="card sm:max-w-md lg:max-w-screen-lg lg:card-side bg-base-200/70 shadow-xl">
				<figure className="relative lg:max-w-sm">
					<img className="object-cover w-full h-full" src={user.profileImg} alt="profile" />
					<div className="absolute bottom-0 bg-gradient-to-t w-full from-10% from-primary h-[40%] flex justify-center items-end">
						<h2 className="mb-2 text-primary-content font-bold capitalize">{user.username}</h2>
					</div>
				</figure>

				<div className="card-body">
					<div>
						<label className="form-control">
							<span className="label-text">Country</span>

							<input
								className="input w-full"
								type="text"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>
						</label>
					</div>
					<div>
						<label className="form-control">
							<div className="label">
								<span className="label-text">Your bio</span>
							</div>
							<textarea
								className="textarea textarea-bordered h-24"
								placeholder="Bio"
								value={about}
								onChange={(e) => setAbout(e.target.value)}></textarea>
						</label>
					</div>
					<label className="form-control">
						<div className="label">
							<span className="label-text">Profile picture</span>
						</div>
						<input
							className="file-input w-full"
							type="file"
							onChange={(e) => setNewImage(e.target.files[0])}
						/>
					</label>
					<div>
						<Select
							id="options"
							options={options}
							closeMenuOnSelect={false}
							isMulti
							name="genres"
							styles={customStyles}
							placeholder="Select your favourite genres"
							value={options.filter((obj) => genres.includes(obj.value))}
							onChange={handleGenres}
						/>
					</div>

					<button onClick={handleSubmit} className="btn btn-accent">
						Save Changes
					</button>
				</div>
			</div>
		</Container>
	);
};
