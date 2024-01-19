import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const CarouselTrendingMovies = ({ data, isLoading }) => {
	const swiperSlideStyles = "min-h-[280px] md:min-h-[380px] rounded-md";
	return (
		<>
			<Swiper
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				effect={"cards"}
				grabCursor={true}
				modules={[EffectCards, Autoplay]}
				className="w-48  md:w-64  h-full">
				{isLoading ? (
					<>
						{Array.from(Array(10).keys()).map((item) => {
							return (
								<SwiperSlide
									key={`loading-skeleton-${item}`}
									className={`${swiperSlideStyles} skeleton bg-base-200`}></SwiperSlide>
							);
						})}
					</>
				) : (
					<>
						{data.map((item) => {
							return (
								<SwiperSlide key={`slide-${item.id}`} className={`${swiperSlideStyles}`}>
									<div className="w-full bg-base-200">
										<img
											className="object-cover"
											src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
											alt=""
										/>
										<Link to={`/movies/${item.id}`}>
											<p className="py-4 px-2 text-center text-sm font-light">
												{item.title}
											</p>
										</Link>
									</div>
								</SwiperSlide>
							);
						})}
					</>
				)}
			</Swiper>
		</>
	);
};

export default CarouselTrendingMovies;
