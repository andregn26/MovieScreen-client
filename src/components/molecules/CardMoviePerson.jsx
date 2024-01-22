import React from "react";
import "animate.css";

export const CardMoviePerson = ({ data }) => {
	return (
		<>
			{data &&
				data.map((person, index) => {
					return (
						<article
							className="h-full w-full bg-base-200 max-w-[150px] rounded-md overflow-hidden"
							key={index}>
							<div className="w-full h-full ">
								<img
									src={`${
										person.profile_path
											? `https://image.tmdb.org/t/p/w400${person.profile_path}`
											: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
									} `}
									alt="castpicture"
									className=" object-cover h-2/3  w-full object-top"
								/>
								<div className="px-3 py-2 text-xs text-center">
									<p className="font-light">{person.name}</p>

									<p className="font-semibold">
										{person.character ? (
											<>as {person.character}</>
										) : (
											<>{person.job}</>
										)}{" "}
									</p>
								</div>
							</div>
						</article>
					);
				})}
		</>
	);
};
