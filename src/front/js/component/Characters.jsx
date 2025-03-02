import React, { useActionState, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Characters() {
    const { store, actions } = useContext(Context)
    const { theid } = useParams()
    const [data, setData] = useState({})
    const navigate = useNavigate()

    function getCharacter() {
        let result = store.characters.find((item) => item.id == theid)
        setData(
            result
        )
    }
    useEffect(() => {
        actions.getUserFavorites()
        getCharacter()
    }, [store.characters])

    function CharacterDetails(props) {
        return (
            <div className="col-2 mt-2">
                <span className="d-flex flex-row justify-content-center">{props.name}:<br /></span>
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
                                src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
                            />
                        </div>
                        <div className="col-7 col-lg-6 ">
                            <div>
                                <h1 className="d-flex justify-content-center">{data.name}</h1>
                                {
                                    data.known_for &&
                                    (
                                        <>
                                            <h2 className="fs-4 d-flex justify-content-center">Movie Known For</h2>
                                            <h3 className="d-flex justify-content-center">{data.known_for[2]?.title}</h3>
                                            <p className="d-flex justify-content-center">{data.known_for[2]?.overview}</p>
                                        </>
                                    )
                                }
                            </div>
                            <div className="d-flex align-items-center h-100 justify-content-center">
                                <div>
                                    {
                                        store.token &&
                                        <button className="btn btn-warning" onClick={() => navigate(`/share/character/${theid}`)}>Share</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 border border-danger mt-4"></div>


                    <div className="text-danger d-flex justify-content-between px-5 pt-2">
                        <CharacterDetails name="Name" nameData={data.name} />
                        <CharacterDetails name="Popularity" nameData={data.popularity} />
                        <CharacterDetails name="Gender" nameData={data.gender == 0 ? "Not specified" : data.gender == 1 ? "Female" : data.gender == 2 ? "Male" : data.gender == 3 && "Non binary"} />
                        <CharacterDetails name="Role known for" nameData={data.known_for_department} />

                    </div>
                </>


            }

        </div>
    )
}

export default Characters
