import React from "react";
import "animate.css";

export const ReviewForm = ({ handleForm, form, handleSubmit, rating, setRating, review, setReview }) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				marginTop: "20px",
			}}>
			<div
				className="row"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{!form ? (
					<button
						onClick={handleForm}
						style={{
							width: "250px",
							alignSelf: "center",
							color: "whitesmoke",
							fontSize: "1rem",
							paddingRight: "20px",
							paddingLeft: "20px",
							paddingTop: "10px",
							paddingBottom: "25px",
						}}>
						Leave a review
					</button>
				) : (
					<button
						onClick={handleForm}
						style={{
							width: "100px",
							alignSelf: "center",
							color: "whitesmoke",
							fontSize: "1rem",
							paddingRight: "20px",
							paddingLeft: "20px",
							paddingTop: "10px",
							paddingBottom: "25px",
						}}>
						close
					</button>
				)}
				{form && (
					<form
						className="animate__animated animate__fadeIn"
						onSubmit={handleSubmit}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<label style={{ marginTop: "30px" }}>Rating:</label>
						<input
							placeholder="★ 1-10"
							required
							type="number"
							min="0"
							max="10"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						/>
						<label style={{ marginTop: "30px" }}>Review:</label>
						<textarea
							required
							cols="30"
							rows="5"
							value={review}
							onChange={(e) => setReview(e.target.value)}></textarea>
						<button
							style={{
								width: "80px",
								fontSize: "0.8rem",
								marginTop: "20px",
							}}
							type="submit">
							Submit
						</button>
					</form>
				)}
			</div>
		</div>
	);
};
