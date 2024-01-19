import CarouselGrid from "../molecules/CarouselGrid";

const CarouselSection = ({ title, isLoading, data }) => {
	return (
		<div id="upcoming-movies" className=" w-full mt-24">
			<h2 className="heading-3">{title}</h2>
			<div className="w-full ">
				<CarouselGrid isLoading={isLoading} data={data} />
			</div>
		</div>
	);
};

export default CarouselSection;
