const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			movies: [],
			characters: [],
			favorites: [],
			token: localStorage.getItem("token") || null,
			posts: [],
			postedElements: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			SignUp: async (user) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/sign-up`,
						{
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(user)
						}
					)

					return response.status
				}
				catch (error) {
					console.log(error)
					return false

				}
			},
			SignIn: async (user) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/sign-in`,
						{
							method: 'POST',
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(user)
						})
					let data = await response.json()
					if (response.ok) {
						setStore({
							token: data.token
						})
						localStorage.setItem("token", data.token)
					}
					return response.status
				}
				catch (error) {
					return false
				}
			},
			logOut: () => {
				setStore({ token: null })
				localStorage.removeItem("token")
			},
			getMovies: async () => {
				try {
					// if (getStore().people.length <= 0) {
					let response = await fetch(`https://api.themoviedb.org/3/movie/popular`,
						{
							method: 'GET',

							headers: {
								"Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
							}
						}
					)

					let data = await response.json()
					for (let i = 0; i < data.results.length; i++) {
						setStore({
							movies: [...getStore().movies,
							data.results[i]
							]
						})
					}
				}

				catch (error) {
					console.log(error)
				}

			},
			getCharacters: async () => {
				try {
					// if (getStore().people.length <= 0) {
					let response = await fetch(`https://api.themoviedb.org/3/person/popular`,
						{
							method: 'GET',

							headers: {
								"Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
							}
						}
					)

					let data = await response.json()
					for (let i = 0; i < data.results.length; i++) {
						setStore({
							characters: [...getStore().characters,
							data.results[i]
							]
						})
					}
				}

				catch (error) {
					console.log(error)
				}

			},

			addFavorite: async (element, nature) => {
				if (!getStore().favorites.includes(element)) {
					let response = await fetch(`${process.env.BACKEND_URL}/favorite/${nature}`,
						{
							method: 'POST',
							headers: {
								"Content-Type": "application/json",
								"Authorization": `Bearer ${getStore().token}`
							},
							body: JSON.stringify(element)
						}
					)
					getActions().getUserFavorites()
					let data = await response.json()
					setStore({
						favorites: [...getStore().favorites,
							data]
					})
				}
			},
			deleteFavorite: async (id) => {
				let response = await fetch(`${process.env.BACKEND_URL}/favorite/${id}`,
					{
						method: 'DELETE',
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						}
					}
				)
				getActions().getUserFavorites()
			},
			getUserFavorites: async () => {
				let response = await fetch(`${process.env.BACKEND_URL}/users/favorites`,
					{
						headers: {
							"Authorization": `Bearer ${getStore().token}`
						}
					}
				)
				if (response.status != 401) {
					let data = await response.json()
					setStore({ favorites: data })
				}
				else {
					getActions().logOut()
				}
			},
			shareCharacter: async (id, message) => {
				let response = await fetch(`${process.env.BACKEND_URL}/share/character/${id}`,
					{
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().token}`
						},
						body: JSON.stringify(message)
					}
				)
				return response

			},
			shareMovie: async (id, message) => {
				let response = await fetch(`${process.env.BACKEND_URL}/share/movie/${id}`,
					{
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().token}`
						},
						body: JSON.stringify(message)
					}
				)
				return response

			},
			getPosts: async () => {
				let response = await fetch(`${process.env.BACKEND_URL}/get-posts`,
					{
						method: 'GET'
					}
				)
				let data = await response.json()
				setStore({ posts: data })
			},
			getPostedCharacter: async (id) => {

				try {
					let response = await fetch(`https://api.themoviedb.org/3/person/${id}`,
						{
							method: 'GET',

							headers: {
								"Authorization": `Bearer ${process.env.ACCESS_TOKEN}`

							}
						}
					)
					let data = await response.json()
					getStore().postedElements.push(data)

					return data
				}

				catch (error) {
					console.log(error)
				}

			},
			getPostedMovie: async (id) => {
				try {
					let response = await fetch(`https://api.themoviedb.org/3/movie/${id}`,
						{
							method: 'GET',

							headers: {
								"Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
							}
						}
					)
					let data = await response.json()

					getStore().postedElements.push(data)
					return data
				}

				catch (error) {
					console.log(error)
				}

			}
		}
	};
};

export default getState;
