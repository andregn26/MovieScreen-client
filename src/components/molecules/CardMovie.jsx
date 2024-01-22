import React from "react";
import { Link } from "react-router-dom";
import "animate.css";

export const CardMovie = ({ data }) => {
	return (
		<>
			{data &&
				data.map((movie) => {
					return (
						<div key={movie.id} className={`h-full w-full rounded-md overflow-hidden`}>
							<Link to={`/movies/${movie.id}`}>
								<div className="w-full  flex flex-col bg-base-200 rounded-md min-h-48">
									<img
										className="object-cover w-full h-full min-h-64"
										src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
										alt=""
									/>
									<p className="min-h-24 flex items-center justify-center py-1 px-2 text-center text-sm font-light ">
										{movie.title}
									</p>
								</div>
							</Link>
						</div>
					);
				})}
		</>
	);
};
