import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {

  const navigate = useNavigate();
  const data = JSON.parse(window.localStorage.getItem("Order"));
  const res = {"verify" : null, "order" : data};
  const [buffer, setBuffer] = useState(true);


  const API = axios.create({baseURL : "http://localhost:5000"});

  const initPayment = async (resdata) => {
    const options = {
      key : "rzp_test_Y5s7JS2YJM7tmR",
      price : resdata.price,
      currency : resdata.currency,
      description : "Pizza House Checkout",
      order_id : resdata.id,
      handler : async (response) => { //since immediately after the verification step, we place the order, we need to also include in the order in the payload sent to the server for verification.
        res["verify"] = response;
        if(res.verify){ //had to check if verify is updated before sending in the verification request to the server.
        
        //Include in a useState to set Buffer, for verification process and redirection after the order has been successfully placed
        //Or if an error occours, ask them to retry the payment process!
        
        API.post("/user/payment/verify",res)
        .then((response) => { //after the order has been palced 
          navigate("/placed");
        })
        .catch((err) => {
          console.log(err);
        })}
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const HandleCheckout = async() =>
  {
    data.email = (JSON.parse(window.localStorage.getItem("Email")));

    API.post("/user/order", data)
    .then((response) => 
    {
      initPayment(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  return (
    <div>
      {buffer && <div className = "Buffer_Modal">
          <img src="/Animation - 1706189080735.gif"></img>
      </div>}
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