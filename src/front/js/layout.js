import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home.jsx";
import { Navbar } from "./component/Navbar.jsx";
import Characters from "./component/Characters.jsx";
import Movies from "./component/Movies.jsx";
import { SignUp } from "./component/SignUp.jsx";
import { SignIn } from "./component/SignIn.jsx";
import { ShareCharacter } from "./component/ShareCharacter.jsx";
import { ShareMovie } from "./component/ShareMovie.jsx";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Navbar/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<h1>Not found!</h1>} />
					<Route path="/characters/:theid" element={<Characters/>} />
					<Route path="/movies/:theid" element={<Movies/>} />
					<Route path="/sign-up" element={<SignUp/>} />
					<Route path="/sign-in" element={<SignIn/>} />
					<Route path="/share/character/:theid" element={<ShareCharacter/>}/>
					<Route path="/share/movie/:theid" element={<ShareMovie/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
