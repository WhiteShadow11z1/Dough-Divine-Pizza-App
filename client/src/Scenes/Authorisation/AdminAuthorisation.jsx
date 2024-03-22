import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminAuthorisation()
{
    const navigate = useNavigate();
    const [isRegister, setRegister] = useState(false);
    const [data, setData] = useState({firstName : null, lastName : null, adminID : null, password : null});

    const Update = (e) =>
    {
        setData({...data, [e.target.name]  : e.target.value})
    }

    const AuthUpdate = () =>
    {
        setRegister((prev) => !prev);
    }
    
    const API = axios.create({baseURL : "http://localhost:5000/"})

    const HandleLoginSubmit = async(e) =>
    {
        e.preventDefault();

        API.post("/admin/auth/login", data)
        .then((response) => 
        {
            navigate("../admin/dashboard");
            console.log(response);
        }
        ).catch((err) =>
        {
            console.log(err);
        })

    }

    const HandleRegisterSubmit = async(e) =>
    {
        e.preventDefault();

        API.post("/admin/auth/register", data)
        .then( (response) =>
        {
            console.log(response);
        })
        .catch( (err) =>
        {
            console.log(err);
        })
    }

    return(
        <>
        {!isRegister && 
            <div>
            <form method = "post" action = "/admin/auth/login" onSubmit={HandleLoginSubmit}>
                <input type = "text" name = "adminID" placeholder = "Admin ID" onChange={Update}></input>
                <input type = "password" name = "password" placeholder = "Password" onChange={Update}></input>
                <button type = "submit">Login</button>
            </form>
            <p onClick={AuthUpdate}>Register for admin</p>
            <Link to = "../../auth">User Login</Link>
        </div>
        }

        {isRegister &&
            <div>
                <form method = "post" action = "/admin/auth/register" onSubmit={HandleRegisterSubmit}>
                    <input type = "text" name = "firstName" placeholder = "First Name" onChange={Update}></input>
                    <input type = "text" name = "lastName" placeholder = "Last Name" onChange={Update}></input>
                    <button type = "submit">Apply</button>
                </form>
                <p onClick={AuthUpdate}>Admin Login</p>
                <Link to = "../../auth">User Login</Link>
            </div>
        }
        </>        
    )
}

export default AdminAuthorisation;