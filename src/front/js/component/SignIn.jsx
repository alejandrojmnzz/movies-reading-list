import React from "react";
import {useState, useContext} from "react";
import {Context} from "../store/appContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export function SignIn() {

    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    
    function handleChange({target}) {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (user.email.trim() == "" || user.password == "") {
            alert("All credentials are required")
        }
        else {
            const response = await actions.SignIn(user)
            if (response == 200 && store.token != null) {
                alert("Logged in successfully")
                navigate("/")
            }
            if (response == 404) {
                alert("Incorrect credentials")
            }
            console.log(response)
        }
    }
    useEffect(() => {
        if (store.token != null) {
            navigate('/')
        }
    }, [])
    return (
        <div>
            <div className="container">
                <h1 className="text-center">Sign In</h1>
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name="password" type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2 align-items-center">Submit</button>
                </form>
                <div className="aling-items-center">
                <NavLink to="/sign-up">You don't have an account?</NavLink>
                </div>
        </div>
        </div>
    )
}