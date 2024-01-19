import React from "react";

const Footer = () => {
	return (
		<footer className="mt-24 bg-base-300 px-8 py-4 items-center">
			<div className="flex justify-between">
				<h5>Made by JN & AG</h5>
				<a href={"https://developers.themoviedb.org/"} target="blank">
					<img src={"https://bit.ly/39YwFnl"} alt="TMDBlogo" className="w-8 h-8" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
