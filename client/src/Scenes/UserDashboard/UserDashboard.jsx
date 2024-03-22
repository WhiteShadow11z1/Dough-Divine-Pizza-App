import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {

    const navigate = useNavigate();

    const handleOrder = () =>
    {
        navigate("/user/bookings");
    }

    const handleStatus = () =>
    {
        navigate("/user/status");
    }
    return (
        <div>
            <p>Welcome!</p>
            <p onClick={handleOrder}>Order a pizza</p>
            <p onClick={handleStatus}>Order History</p>
        </div>
    )
}

export default UserDashboard;