import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

    const navigate = useNavigate();

    const HandleInventoryClick = () => {
        navigate("/admin/inventory");
    }

    const HandleOrderClick = () => {
        navigate("/admin/orders");
    }
    return (
        <div>
            <p onClick = {HandleInventoryClick}>Inventory</p>
            <p onClick = {HandleOrderClick}>Orders</p>
        </div>
    )
}

export default AdminDashboard;