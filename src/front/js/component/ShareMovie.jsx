import React from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function ShareMovie() {
    const {store, actions} = useContext(Context)
    const [data, setData] = useState({})
    const {theid} = useParams()
    const [message, setMessage] = useState({})
    const navigate = useNavigate()

    function getElement() {
        let result = store.movies.find((item) => item.id == theid)
        setData(
            result
        )
    }

    function handleChange({target}) {
        setMessage({...message,
        "message": target.value
        })
    }
    async function handleSubmit(event) {
        event.preventDefault()
        let response = await actions.shareMovie(theid, message)
        if (response.status == 200) {
            alert("Posted succesfully")
            navigate('/')
        }
        else {
            alert('An error ocurred')
        }
    }
    useEffect(() => {
        getElement()
    }, [store.characters])

    return (
        <>
        {
        data && 
        <div className="container">
            <div className="d-flex justify-content-center">
                <h1>Share {data.name}</h1>
            </div>
            <form>
                <label>Message</label>
                <input className="form-control" placeholder="Enter a message about the character" value={message.message} onChange={handleChange} required/>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    }
    </>
    )
}