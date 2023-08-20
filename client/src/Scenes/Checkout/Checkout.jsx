import React, {useState} from 'react';
import axios from 'axios';

function Checkout() {


  const [data,setData] = useState(JSON.parse(window.localStorage.getItem("Order")));
  const [response, setResponse] = useState(null);

  const API = axios.create({baseURL : "http://localhost:5000"});

  const initPayment = async(resdata) => {
    const options = {
      key : "Poss8CWqBHBpXyadoTwFqSss",
      price : resdata.price,
      currency : resdata.currency,
      description : "Pizza House Checkout",
      order_id : resdata.id,
      handler : async(response) => {
        API.post("/user/payment/verify",response)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const HandleCheckout = async() =>
  {
    data.email = JSON.parse(window.localStorage.getItem("Email"));

    API.post("/user/order", data)
    .then((response) => 
    {
        setResponse(response.data);
        initPayment(response.data);
        console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  return (
    <div>
      <div className = "Order">
        <p>Base : {data.base}</p>
        <p>Sauce : {data.sauce}</p>
        <p>Cheese : {data.cheese}</p>
        <p>Toppings :</p>
        {data.toppings.map( (tops) =>
        (
          <div>
            {tops}
          </div>
        ))}
        <p>Price : {data.price}</p>
      </div>
      <button onClick={HandleCheckout}>Pay</button>
    </div>
  )
}

export default Checkout;