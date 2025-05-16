import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function Movies() {
    const { store, actions } = useContext(Context)
    const { theid } = useParams()
    const [data, setData] = useState({})
    const navigate = useNavigate()

    function getCharacter() {
        let result = store.movies.find((item) => item.id == theid)
        setData(
            result
        )
    }
    useEffect(() => {
        getCharacter()
        actions.getUserFavorites()

    }, [store.movies])

    function CharacterDetails(props) {
        return (
            <div className="col-2 mt-2">
                <span className="d-flex flex-row justify-content-center">{props.name}:<br/></span>
                <span className="d-flex flex-row justify-content-center">{props.nameData}</span>
            </div>
        )
    }
    return (
        
        <div className="container">
            {
            data &&
            <>
            <div className="row">
                <div className="col-7 col-lg-6 d-flex justify-content-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    />
                </div>
                <div className="col-7 col-lg-6">
                    <div>
                        <h1 className="d-flex justify-content-center">{data.title}</h1>
                        <p className="d-flex justify-content-center">{data.overview}</p>

                    </div>
                    <div className="d-flex align-items-center h-100 justify-content-center">
                        <div>
                            {
                            store.token &&
                            <button className="btn btn-warning" onClick={() => navigate(`/share/movie/${theid}`)}>Share</button>
                            }
                        </div>
                    </div>
                    </div>
                </div>
     
            <div className="col-12 border border-danger mt-4"></div>
            

            <div className="row text-danger justify-content-between px-5 pt-2">
                    <CharacterDetails name="Title" nameData={data.title}/> 
                    <CharacterDetails name="Popularity" nameData={data.popularity}/>    
                    <CharacterDetails name="Release Date" nameData={data.release_date}/>
                    <CharacterDetails name="Original Language" nameData={data.original_language}/>
                
                </div>
                </>
            }
        </div>
    )
}

export default Movies
