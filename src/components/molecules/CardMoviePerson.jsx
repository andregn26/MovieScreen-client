import React from "react";
import "animate.css";

export const CardMoviePerson = ({ data }) => {
	return (
		<>
			{data &&
				data.map((credit, index) => {
					return (
						<article className="h-full w-full bg-base-200 max-w-[150px] rounded-md" key={index}>
							<div className="w-full h-full rounded-sm overflow-hidden">
								<img
									src={`${
										credit.profile_path
											? `https://image.tmdb.org/t/p/w400${credit.profile_path}`
											: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
									} `}
									alt="castpicture"
									className=" object-cover h-2/3 w-full object-top"
								/>
								<div className="px-3 py-2 text-xs text-center">
									<p className="font-light">{credit.name}</p>
									{credit.character ? (
										<p className="font-semibold">as {credit.character}</p>
									) : null}
								</div>
							</div>
						</article>
					);
				})}

			{/* <div className="w-full bg-base-200">
				{movieCrew &&
					movieCrew.map((crew, index) => {
						return (
							<article
								className="animate__animated animate__fadeInLeft card-background"
								style={{
									width: "80px",
									boxShadow: "-5px 0 20px black",
									backgroundColor: "purple",
									borderRadius: "8px 8px 8px 0",
								}}
								key={index}>
								{crew.profile_path ? (
									<img
										src={`https://image.tmdb.org/t/p/w400${crew.profile_path}`}
										alt="castpicture"
										style={{ width: "80px", borderRadius: "8px 8px 0 0" }}
									/>
								) : (
									<img
										src={
											"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
										}
										alt="castpicture"
										style={{ width: "80px", borderRadius: "8px 8px 0 0" }}
									/>
								)}
								<div style={{ width: "80px" }}>
									<p className="fs-600 ff-sans-cond" style={{ padding: "10px" }}>
										{crew.name}
									</p>
									<p style={{ padding: "10px", color: "grey" }}>
										<small>{crew.job}</small>
									</p>
								</div>
							</article>
						);
					})}
			</div> */}
		</>
	);
};
