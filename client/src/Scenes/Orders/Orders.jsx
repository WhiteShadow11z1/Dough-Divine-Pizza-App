import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./Orders.css";

function Orders() {

    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const API = axios.create({baseURL : "http://localhost:5000/user"})
    const email = JSON.parse(window.localStorage.getItem("Email"));
    
    const getOrder = async() =>
    {
        API.post("/status", {email : email})
        .then( (response) => {
            setData(response.data);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }

    useEffect( () =>
    {
        getOrder();
    },[refresh]);

    const HandleRefresh = () => {
        setRefresh ((prev) => prev += 1);
    }

    return (
        <>
        <button onClick = {HandleRefresh}>Refresh</button>
        {data !== null && data.map((order) => (
            <div className = "Order-Map-Container">
                <div className = "Order">
                    <p>{order.base}</p>
                    <p>{order.sauce}</p>
                    <p>{order.cheese}</p>
                    <div className = "Order-Toppings">
                        {order.toppings.map((tops) => (
                            <p>{tops}</p>
                        ))}
                    </div>
                    <p style={{color : order.status === "Preparing" ? "red" : "green"}}>{order.status}</p>
                </div>
            </div>
        ))}
        </>
    )
}

export default Orders;