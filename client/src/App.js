import './App.css';
import Authorisation from './Scenes/Authorisation/Authorisation.jsx';
import {Route, Routes, Navigate} from "react-router-dom";
import VerificationPage from './Scenes/VerificationPage/VerificationPage';
import UserDashboard from './Scenes/UserDashboard/UserDashboard';
import PageNotFound from './Scenes/PageNotFound/PageNotFound.jsx';
import AdminAuthorisation from './Scenes/Authorisation/AdminAuthorisation';
import AdminInventory from './Scenes/AdminInventory/AdminInventory';
import UserBooking from './Scenes/UserBooking/UserBooking';
import Checkout from './Scenes/Checkout/Checkout';
import Order from './Scenes/Orders/Orders.jsx';
import AdminDashboard from './Scenes/AdminDashboard/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/"  element = {<Navigate to = "auth"/>} />
        <Route path = "/auth" element = {<Authorisation />} />
        <Route path = "/user/checkout" element = {<Checkout />} />
        <Route path = "/user/bookings" element = {<UserBooking/>} />
        <Route path = "/user/status" element = {<Order />} />
        <Route path = "/user/dashboard" element = {<UserDashboard />} />
        <Route path = "/auth/verification/" element = {<VerificationPage />} />
        <Route path = "*" element = {<Navigate to = "/404/notfound" />} />
        <Route path = "/404/notfound" element = {<PageNotFound />} />
        <Route path = "/admin/auth" element = {<AdminAuthorisation />}></Route>
        <Route path = "/admin/inventory" element = {<AdminInventory/>}></Route>
        <Route path = "/admin/dashboard" element = {<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;