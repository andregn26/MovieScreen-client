import React from "react";
import { Link } from "react-router-dom";

const MovieSearchModal = ({ movie, cleanUp, isLoadingSearch }) => {
	return (
		<div className="absolute top-0 bg-base-200/80 backdrop-blur h-[calc(100vh-64px)] w-full z-10 flex flex-col items-center">
			<div className=" w-full h-full py-8  overflow-y-scroll flex flex-col items-center gap-4">
				{movie && isLoadingSearch ? (
					<>
						{Array.from(Array(8).keys()).map((item) => (
							<div className="w-[80%] max-w-screen-sm  rounded-2xl skeleton min-h-24"></div>
						))}
					</>
				) : (
					<>
						{movie.map((found, index) => (
							<div className="w-[80%] max-w-screen-sm bg-base-300  rounded-2xl overflow-hidden min-h-24">
								<Link to={`/movies/${found.id}`} className="w-full">
									<div className="h-full flex" key={index} onClick={cleanUp}>
										<img
											src={
												found.poster_path
													? `https://image.tmdb.org/t/p/w400${found.poster_path}`
													: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
											}
											alt="poster"
											className="h-full w-16 object-cover"
										/>

										<div className="mx-4  gap-2  w-full flex flex-col justify-center text-gray-200">
											<h4>{found.title}</h4>
											<div className="flex justify-between text-sm text-gray-400">
												<p>★ {found.vote_average}</p>
												<p>{found.release_date}</p>
											</div>
										</div>
									</div>
								</Link>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default MovieSearchModal;
