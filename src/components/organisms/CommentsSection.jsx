import CardComment from "../molecules/CardComment";

const CommentsSection = ({ data, isLoading }) => {
	return (
		<section id="" className="w-full mt-24">
			<h2 className="heading-3">Most recent reviews from our users</h2>
			<div className="grid gap-8 grid-cols-1 md:gap-12 md:grid-cols-2 xl:grid-cols-3">
				{isLoading ? (
					<>
						<div className="skeleton bg-base-200 rounded-md min-h-48 w-full col-span-1 md:col-span-2 xl:col-span-3 flex justify-center items-center">
							<p className="">
								Due to restrictions in the free hosting plan, the database may take up to 30
								seconds to load
							</p>
						</div>
					</>
				) : (
					<>
						{data && (
							<>
								{data.map((review) => (
									<CardComment key={review._id} data={review} />
								))}
							</>
						)}
					</>
				)}
			</div>
		</section>
	);
};

export default CommentsSection;
