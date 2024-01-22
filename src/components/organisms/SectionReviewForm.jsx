export const SectionReviewForm = ({ handleForm, form, handleSubmit, rating, setRating, review, setReview }) => {
	return (
		<div className="flex flex-col items-center w-full">
			<button className="btn btn-primary btn-outline btn-wide" onClick={handleForm}>
				{!form ? <>Leave a review</> : <>close</>}
			</button>

			{form && (
				<form
					onSubmit={handleSubmit}
					className="flex flex-col bg-base-200 rounded-xl mt-6 px-4 py-6 gap-6 w-full max-w-2xl items-center">
					<label className="form-control w-full max-w-xl">
						<div className="label">
							<span className="label-text">Rating</span>
						</div>
						<input
							placeholder="★ 1-10"
							required
							type="number"
							min="0"
							max="10"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
							className="input input-bordered w-full max-w-xl"
						/>
					</label>
					<label className="form-control w-full max-w-xl">
						<div className="label">
							<span className="label-text">Review</span>
						</div>
						<textarea
							required
							value={review}
							onChange={(e) => setReview(e.target.value)}
							className="textarea textarea-bordered h-36 w-full max-w-xl textarea-xl"></textarea>
					</label>

					<button type="submit" className="btn btn-primary btn-wide">
						Submit
					</button>
				</form>
			)}
		</div>
	);
};
