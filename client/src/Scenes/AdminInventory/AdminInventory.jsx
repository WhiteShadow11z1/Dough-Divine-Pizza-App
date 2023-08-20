import React, {useState, useEffect} from 'react';
import Stock from '../../Components/Stock/Stock.jsx';
import axios from 'axios';
import "./AdminInventory.css";

function AdminInventory() {

  const [data, setData] = useState(null);

  const API = axios.create({baseURL : "http://localhost:5000"});

  useEffect ( () => {
    API.get("/inventory/stock")
    .then( (response) => {
      console.log(response);
      setData(response.data);
    })
    .catch( (err) => {
      console.log(err.error);
    })
  },[]);

  return (
    <div className = "Inventroy-Main-Container">
    {data !== null }
    {data !== null && data.map ( (stock) => (
      <Stock name = {stock.name} count = {stock.count}></Stock>
    ))}
    </div>
  )
}

export default AdminInventory;