import { Link } from "react-router-dom";
import { format } from "timeago.js";

const CardComment = ({ data }) => {
	console.log("🚀 ~ CardComment ~ data:", data);
	return (
		<div className="bg-base-200/90 px-6 py-4 rounded-md flex flex-col justify-between" key={data._id}>
			<h6 className="text-md ">
				{data.author.username} about{" "}
				<span className="font-semibold text-primary">
					<Link to={`/movies/${data.movie.id}`}>{data.movie.title}</Link>
				</span>
			</h6>
			<p className="mt-2 text-sm text-base-content/70">"{data.review}"</p>
			<div className="w-full flex items-center justify-between mt-6 text-xs">
				<p className="">
					<span className="text-primary font-bold">★ {data.rating}</span>
					/10
				</p>
				<p>{format(data.createdAt)}</p>
			</div>
		</div>
	);
};

export default CardComment;
