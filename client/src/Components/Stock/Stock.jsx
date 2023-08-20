import React, {  useState } from 'react';
import axios from "axios";
import "./Stock.css";

function Stock(props) {

  const API = axios.create({baseURL : "http://localhost:5000/"});

  const [data, setData] = useState({name :props.name, count : props.count})
  const [input, setInput] = useState(null);

  const Restock = async() =>
  {
    setInput("");
    await API.post("inventory/stock/restock", {name : data.name, count : (Number(data.count) + Number(input))})
    .then( (response) =>
    {
      if(response.status === 200)
      {
        setData({name : props.name, count : (Number(data.count) + Number(input))});
      }
    })
    .catch((err) =>
    {
      console.log(err);
    })
  }

  const Update = (e) =>
  {
    setInput(e.target.value);
  }
  

  return (
    <div className ="Stock-Card">
      <img src ="#" alt = "Stock"></img>
      <p>{data.name}</p>
      <p>{data.count}</p>
      <input className = "Stock-Card-Input" type = "text" name = {props.name}  placeholder = "count" value = {input} onChange={Update}/>
      <button className = "Stock-Card-Submit" type = "submit" onClick={Restock}>Restock</button>
    </div>
  )
}

export default Stock;