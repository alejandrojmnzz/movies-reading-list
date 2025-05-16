import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function SignUp() {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        email: "",
        password: ""
    })
    function handleChange({ target }) {
        setUser({
            ...user,
            [target.name]: target.value
        })
        console.log(user)
    }
    async function handleSubmit(event) {
        event.preventDefault()
        if (user.name.trim() == "" || user.email.trim() == "" || user.password == "") {
            alert("All credentials are required")
        }
        else {
            const response = await actions.SignUp(user)
            if (response == 201) {
                alert("User created")
                navigate('/sign-in')
            }
            if (response == 409) {
                alert("User already exists")
            }
            if (response == 400) {
                alert("Error registering")
            }
        }
    }
    return (
        <div className="container">
        <h1 className="text-center">Sign Up</h1>

        <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="text" onChange={handleChange} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Last Name</label>
                    <input name="lastName" type="text" onChange={handleChange} className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
        </div>
    )
}