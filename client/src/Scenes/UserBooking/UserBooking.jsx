import React, {useState} from 'react';
import "./UserBooking.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function UserBooking() {
    const [selectedBase, setBase] = useState(null);
    const [selectedSauce, setSauce] = useState(null);
    const [selectedCheese, setCheese] = useState(null);
    const [selectedToppings, setToppings] = useState([]);

    const navigate = useNavigate();

    const avaialableToppings = [
        { id: 1, name: 'Pepperoni', price : Number(100) },
        { id: 2, name: 'Mushroom', price : 100 },
        { id: 3, name: 'Bell Pepper', price :100 },
        { id: 4, name: 'Olives', price :100 },
        { id: 5, name: 'Onions', price :100 },
      ];

    const availablePizzaBases = [
        {id : 1, name : 'Stuffed Crust', price : Number(100) },
        {id : 2, name : 'Cracker Crust', price :100 },
        {id : 3, name : 'Flat Bread Crust', price :100 },
        {id : 4, name : 'Thin Crust', price :100 },
        {id : 5, name : 'Cheese Crust', price :100 }
    ];

    const availablePizzaSauces = [
        {id : 1, name : 'Tomato Sauce', price :100 },
        {id : 2, name : 'Pesto Sauce', price :100 },
        {id : 3, name : 'Buffalo Sauce', price :100 },
        {id : 4, name : 'White Sauce', price :100 },
        {id : 5, name : 'Hummus', price :100 }
    ];

    const availableCheese = [
        {id : 1, name : 'Mozzarella', price :100 },
        {id : 2, name : 'Cheddar', price :100 },
        {id : 3, name : 'Cottage', price :100 },
        {id : 4, name : 'Panneer', price :100 }
    ];

    const handleBaseClick = (baseID) => {
        setBase(baseID);
    }

    const handleSauceClick = (baseID) => {
        setSauce(baseID);
    }

    const handleCheeseClick = (baseID) => {
        setCheese(baseID);
    }

    const handleToppingsClick = (baseId) => {
        if(selectedToppings.includes(baseId))
        {
            setToppings(selectedToppings.filter((id) => id !== baseId));
        }
        else
        {
            setToppings([...selectedToppings,baseId]);
        }
    }

    const CalculatePrice = (base, sauce, cheese, toppings) =>
    {
        let cost = base + sauce + cheese;
        for(var i = 0; i < toppings.length; i++)
        {
            cost += toppings[i];
        }

        console.log(cost);
        return cost;
    }
    
    const handleSubmit = () => 
    {
        const base = availablePizzaBases.find( (base) => base.id === selectedBase);
        const sauce = availablePizzaSauces.find( (sauce) => sauce.id === selectedSauce);
        const cheese = availableCheese.find( (cheese) => cheese.id === selectedCheese);
        const toppings = [];
        const toppingsPrice = [];
        
        for(var i = 0; i < selectedToppings.length; i++)
        {
            toppings.push(avaialableToppings[selectedToppings[i] - 1].name);
            toppingsPrice.push(avaialableToppings[selectedToppings[i] - 1].price);
        }

        const price = CalculatePrice(base.price, sauce.price, cheese.price, toppingsPrice);

        const order = {
            base : base.name,
            sauce : sauce.name,
            cheese : cheese.name,
            toppings : toppings,
            price : price
        }

        window.localStorage.setItem("Order", JSON.stringify(order));
        
        navigate("/user/checkout");
    }

    return (
        <div className = "User-Booking">
            <p>Pizza Base</p>
            <div className = "Pizza-Base">
            {availablePizzaBases.map( (base) => (
                <div 
                key={base.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  margin: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedBase === base.id ? 'orange' : 'white',
                }}
                onClick={() => handleBaseClick(base.id)}
                >
                <h3>{base.name}</h3>
                <p>{base.price}</p>
                </div>
            ))}
            </div>
            <p>Sauce</p>
            <div className = "Pizza-Sauce">
            {availablePizzaSauces.map( (sauce) => (
                <div 
                key={sauce.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  margin: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedSauce === sauce.id ? 'orange' : 'white',
                }}
                onClick={() => handleSauceClick(sauce.id)}
                >
                <h3>{sauce.name}</h3>
                <p>{sauce.price}</p>
                </div>
            ))}
            </div>
            <p>Cheese</p> 
            <div className = "Pizza-Cheese">
            {availableCheese.map( (cheese) => (
                <div 
                key={cheese.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  margin: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedCheese === cheese.id ? 'orange' : 'white',
                }}
                onClick={() => handleCheeseClick(cheese.id)}
                >
                <h3>{cheese.name}</h3>
                <p>{cheese.price}</p>
                </div>
            ))}
            </div>
            <p>Toppings</p>
            <div className = "Pizza-Toppings">
            {avaialableToppings.map( (toppings) => (
                <div 
                key={toppings.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  margin: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedToppings.includes(toppings.id) ? 'orange' : 'white',
                }}
                onClick={() => handleToppingsClick(toppings.id)}
                >
                <h3>{toppings.name}</h3>
                <p>{toppings.price}</p>
                </div>
            ))}  
            </div>
            <button type = "submit" onClick = {handleSubmit}>Checkout</button>
        
        </div>

    )
}

export default UserBooking;