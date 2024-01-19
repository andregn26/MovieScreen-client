import CardComment from "../molecules/CardComment";

const CommentsSection = ({ data }) => {
	return (
		<section id="" className="w-full mt-24">
			<h2 className="heading-3">Most recent reviews from our users</h2>
			<div className="grid gap-8 grid-cols-1 md:gap-12 md:grid-cols-2 xl:grid-cols-3">
				{data && (
					<>
						{data.map((review) => (
							<CardComment key={review._id} data={review} />
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default CommentsSection;
