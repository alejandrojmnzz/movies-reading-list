import React, { useContext, useEffect } from "react";
import logo from "../../img/Movie Reader.png"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    return (
        <div className="container-fluid navbar">
            <div className="container px-5">
                <Link to="/"><img src={logo} className="logo"/></Link>
                <div className="dropdown">
                    {
                        store.token ? 
                        <>
                        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites <span className="bg-secondary rounded px-1 ms-1">{store.favorites.length}</span>
                        </button>
                        <button className="btn btn-danger ms-3" onClick={() => actions.logOut()}>Log Out</button>
                        <ul className="dropdown-menu">
                        {
                            store.favorites &&
                            store.favorites.map((item, index) => (
                                <li className="d-flex align-items-center" key={index}><Link className="dropdown-item" to={item.nature == 0 ? `/movies/${item.element_id}` : `/characters/${item.element_id}`}>{item.nature == 0 ? item.original_title : item.character_name}</Link><button className="btn" onClick={() => actions.deleteFavorite(item.id)}><i className="fa-solid fa-trash"></i></button></li>
                            ))
                        }
                    </ul>
                    </>

                    :
                    <div>
                        <button className="btn btn-primary" onClick={() =>navigate('/sign-up')}>Sign Up</button>
                        <button className="btn btn-primary ms-3" onClick={() => navigate('/sign-in')}>Sign In</button>
                    </div>
                  
                    }

                </div>
            </div>
        </div>
    )
}