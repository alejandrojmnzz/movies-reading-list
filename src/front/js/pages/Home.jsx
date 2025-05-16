import React, { useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useContext } from "react";
import Card from "../component/MovieCard.jsx";
import CharacterCard from "../component/CharacterCard.jsx";
import { PostCard } from "../component/PostCard.jsx";

export function Home() {
	const {store, actions} = useContext(Context)
	useEffect(() => {
		if (store.token) {
		actions.getUserFavorites()
		}
	}, [store.token])
	return (
		<>
			<div className="container pt-2 px-5">
				<div className="row">
					<Card/>
					<CharacterCard/>
					<PostCard/>
				</div>
			</div>
		</>

	)
}