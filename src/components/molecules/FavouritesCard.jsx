import React from "react";
import { Link } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";

export const FavouritesCard = ({ removeMovie, favList, user, newUser }) => {
	return (
		<>
			{favList.map((fav) => {
				return (
					<article
						className="relative col-span-1 bg-base-200/75 overflow-hidden  rounded-xl shadow-xl"
						key={fav._id}>
						{user && user.username === newUser.username && (
							<div className="absolute top-0 left-0 bg-gradient-to-b from-base-200/80 from-40% w-full flex justify-between items-center px-2 pt-1 pb-8">
								<div className=" cursor-pointer">
									<BsFillXCircleFill
										fill="#ff6b6b"
										onClick={() => removeMovie(fav.id, user)}
									/>
								</div>
								<p className="text-sm text-gray-400">★ {fav.vote_average}</p>
							</div>
						)}
						<Link to={`/movies/${fav.id}`}>
							{fav.poster_path ? (
								<img
									src={`https://image.tmdb.org/t/p/w400${fav.poster_path}`}
									alt="movieposter"
								/>
							) : (
								<img
									src={
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
									}
									alt="movieposter"
								/>
							)}

							<h4 className="py-3 px-2 heading-6 text-gray-200 text-center">{fav.title}</h4>
						</Link>
					</article>
				);
			})}
		</>
	);
};
