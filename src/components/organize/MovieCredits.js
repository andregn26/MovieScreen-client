import React from "react";
import "animate.css";

export const MovieCredits = ({ movieCast, movieCrew }) => {
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					flexWrap: "wrap",
				}}>
				{movieCast &&
					movieCast.map((credit, index) => {
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
								{credit.profile_path ? (
									<img
										src={`https://image.tmdb.org/t/p/w400${credit.profile_path}`}
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
										{credit.name}
									</p>
									<p
										style={{
											padding: "10px",
											color: "grey",
										}}>
										<small>as {credit.character}</small>
									</p>
								</div>
							</article>
						);
					})}
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					flexWrap: "wrap",
				}}>
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
			</div>
		</>
	);
};
