import React from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function MovieCard() {
	const context = useContext(Context)

	return (
		<div className="col-12">
			<h2 className="text-danger py-4">Movies</h2>
			<div className="cards-scroll d-flex">
				{
					context.store.movies.map((item) => {
						return (
							<div key={item.id} className="card">
								<img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="card-img-top" />
								<div className="card-body">
									<h5 className="card-title">{item.title}</h5>
									{
										<p className="card-text">
											Popularity: {item.popularity} <br />
											Release date: {item.release_date} <br />
											Language: {item.original_language}
										</p>


									}
									<div className="d-flex justify-content-between">
										<Link to={`/movies/${item.id}`} className="btn btn-outline-primary">Learn more!</Link>
										{
											context.store.favorites &&
											context.store.token &&
											<button
												className="btn btn-outline-warning"
												onClick={() => {
													context.actions.addFavorite(item, 0)
												}}>
												{context.store.favorites.filter((el) => el.original_title == item.original_title)[0] != null ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}

											</button>

										}

									</div>
								</div>
							</div>
						)
					}
					)
				}
			</div>
		</div>
	)
}
export default MovieCard;