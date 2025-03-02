import React from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function CharacterCard() {
    const context = useContext(Context)

    return (
        <div className="col-12">
                        <h2 className="text-danger py-4">Character</h2>
                        <div className="cards-scroll d-flex">
                            {
                                    context.store.characters.map((item) => {
                                    return (
                                        <div key={item.id} className="card">
                                            <img src={`https://image.tmdb.org/t/p/original${item.profile_path}`} className="card-img-top"/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    {
                                                    <p className="card-text">
                                                        Popularity: {item.popularity} <br/>
                                                        Known for: {item.known_for_department} <br/>
                                                        Gender: {item.gender == 0 ? "Not specified" : item.gender == 1 ? "Female": item.gender == 2 ? "Male" : item.gender == 3 && "Non binary"}			
                                                    </p>
                                        

                                                    }
                                                    <div className="d-flex justify-content-between">
                                                        <Link to={`/characters/${item.id}`} className="btn btn-outline-primary">Learn more!</Link>
                                                        {
                                                            context.store.favorites && 
                                                            context.store.token &&
                                                            <button 
                                                            className="btn btn-outline-warning" 
                                                            onClick={() => {
                                                                context.actions.addFavorite(item, 1)
                                                            }}>
                                                            {context.store.favorites.filter((el) => el.character_name == item.name)[0] != null ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                                        
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
export default CharacterCard;