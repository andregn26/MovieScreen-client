import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Grid, Pagination, Navigation } from "swiper/modules";

const CarouselGrid = ({ data, isLoading }) => {
	return (
		<Swiper
			slidesPerView={2}
			navigation={true}
			grid={{
				rows: 1,
				fill: "rows",
			}}
			spaceBetween={30}
			pagination={{
				clickable: true,
				dynamicBullets: true,
			}}
			breakpoints={{
				640: {
					slidesPerView: 3,
					grid: {
						rows: 1,
						fill: "row",
					},
				},
				768: {
					slidesPerView: 4,
					grid: {
						rows: 1,
						fill: "row",
					},
				},
				1024: {
					slidesPerView: 5,
					grid: {
						rows: 1,
						fill: "row",
					},
				},
				1280: {
					slidesPerView: 6,
					grid: {
						rows: 1,
						fill: "row",
					},
				},
			}}
			modules={[Grid, Pagination, Navigation]}
			className="mx-auto w-full h-full  !pb-12">
			<>
				{isLoading ? (
					<>
						{Array.from(Array(20).keys()).map((item) => {
							return (
								<SwiperSlide
									key={`loading-skeleton-${item}`}
									className={`skeleton bg-base-200 rounded-md min-h-72`}></SwiperSlide>
							);
						})}
					</>
				) : (
					<>
						{data.map((item) => {
							return (
								<SwiperSlide
									key={item.id}
									className={`h-full w-full rounded-md overflow-hidden`}>
									<Link to={`/movies/${item.id}`}>
										<div className="w-full  flex flex-col bg-base-200 rounded-md min-h-48">
											<img
												className="object-cover w-full"
												src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
												alt=""
											/>

											<p className="min-h-24 flex items-center justify-center py-1 px-2 text-center text-sm font-light ">
												{item.title}
											</p>
										</div>
									</Link>
								</SwiperSlide>
							);
						})}
					</>
				)}
			</>
		</Swiper>
	);
};

export default CarouselGrid;
