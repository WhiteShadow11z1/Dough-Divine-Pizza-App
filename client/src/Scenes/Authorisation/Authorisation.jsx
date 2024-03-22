import React, { useEffect, useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "./Authorisation.css";
import axios from "axios";

function Authorisation(){

    const API = axios.create({baseURL : "http://localhost:5000/"});

    const [data, setData] = useState({firstName : null, lastName : null, email : null, password : null, confirmPassword : null});
    const [message, setmessage] = useState({status : null, message : null}); 
    const [isRegister, setRegister] = useState(false);
    const [isPasswordEqualsConfirmPassword, setValidation] = useState(true);
    const [user, setUser] = useState({userID : null, token : null});
    const [loading, setLoading] = useState(false);
    console.log(user);

    const navigate = useNavigate();

    useEffect( () => {}, [message])
    
    /* Upadataing data using hook */
    const update = (e) =>
    {
        setData({...data, [e.target.name] : e.target.value});
    }

    /* To alter between login and register forms */
    const authUpdate = () =>
    {
        setRegister((prev) => !prev);
    }

    /* Handle register form submission */
    const registerSubmit = async (e) =>
    {
        e.preventDefault();

        if(data.password !== data.confirmPassword)
        {
            setValidation(false);
        }
        else
        {
            API.post("/auth/register", data)
            .then( (response) =>
            {
                console.log(response);
                setmessage({status : response.status, message : response.data.message});
            }).catch( (err) =>
            {
                console.log(err);
                setmessage({status : err.status, message : err.response.data.message});
            });
        }
    };

    /* Handle login form submission */
    const loginSubmit = async (e) =>
    {
        e.preventDefault();

        API.post("/auth/login", data)
        .then( (response) =>
        {
            setUser(response.data);
            navigate("../user/dashboard");      
            window.localStorage.setItem("Email" , JSON.stringify(data.email));
        }).catch( (err) =>
        {
            console.log(err);
            setmessage({status : err.status, message : err.response?.data.message});
        });
    };

    return (
        <div className = "Login-Container">
            
            <Link to = "../admin/auth" >Admin Login</Link>

            { /*Login Form */
            !isRegister && user.userID === null &&
                <div className = "Login-Form-Container">
                    <form className = "Login-Form" action = "/auth/login" method = "post" onSubmit={loginSubmit}>
                        <input name = "email" type = "email" placeholder="Email" onChange = {update}></input>
                        <input name = "password" type = "password" placeholder="Password" onChange = {update}></input>
                        <button type = "submit">Log In</button>
                    </form>
                    <p style={{cursor : 'pointer'}} onClick={authUpdate} >Don't have an account ? Register!</p>
                </div>
            }

            { /* Regiter Form */
            isRegister && user.userID === null &&
                <div className = "Register-Form-Container">
                    <form className = "Register-Form" action = "/auth/register" method = "post" onSubmit = {registerSubmit}>
                        <input name = "firstName" type = "text" placeholder = "First Name" onChange = {update} />
                        <input name = "lastName" type = "text" placeholder = "Last Name" onChange = {update} />
                        <input name = "email" type = "email" placeholder = "Email" onChange = {update} />
                        <input name = "password" type = "password" placeholder = "Password" onChange = {update} />
                        <input name = "confirmPassword" type = "password" placeholder="Confirm Password" onChange = {update} />
                        {!isPasswordEqualsConfirmPassword && <p>Password and Confirm Password do not match</p>}
                        <button type = "submit">Register</button>
                    </form>
                    <p style={{cursor : 'pointer'}} onClick={authUpdate} >Already have an account ! Log in</p>
                </div>
            }          
            
            {/* message Handling and display */}
            <div className = "message-Element">
                {message && <p>{message.message}</p>}
            </div>
        </div>
    );
}

export default Authorisation;