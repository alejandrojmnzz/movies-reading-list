import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export function PostCard() {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    async function getElement() {
        if (store.postedElements.length != store.posts.length) {

            for (let item of store.posts) {
                if (item.character_id != null && store.postedElements.length != store.posts.length) {

                    let character = await actions.getPostedCharacter(item.character_id)


                }


                if (item.movie_id != null && store.postedElements.length != store.posts.length) {
                    let movie = await actions.getPostedMovie(item.movie_id)

                }
            }
        }
    }

    useEffect(() => {
        getElement()
    }, [store.posts])

    useEffect(() => {
        actions.getPosts()
    }, [])
    return (
        <>
            <div className="text-warning py-4 d-flex justify-content-center">
                <h1>Posts</h1>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    {
                        store.postedElements &&
                        store.posts &&
                        store.postedElements.map((item, index) => {
                            return (
                                <div className="card col-3" key={index}>
                                    <img src={`https://image.tmdb.org/t/p/original${item.profile_path ? item.profile_path : item.poster_path}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name ? item.name : item.title}</h5>
                                        <p className="card-text mb-2">"{store.posts[index]?.message}"</p>
                                        <p className="card-text text-secondary">Posted by {store.posts[index]?.user?.name} {store.posts[index]?.user?.last_name}</p>

                                        <a href="#" className="btn btn-primary" onClick={() => navigate(`${item.name ? `/characters/${item.id}` : `/movies/${item.id}`}`)}>About</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}