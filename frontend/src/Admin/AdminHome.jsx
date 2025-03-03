import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { Link } from "react-router-dom"; // Import Link


function AdminHome() {
  const [userData, setUserData] = useState(null);
  const [mechanicData, setMechanicData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Fetch user data
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/all-users`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch mechanic data
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/getmechanic`)
      .then(response => {
        setMechanicData(response.data);
      })
      .catch(error => {
        console.error('Error fetching mechanic data:', error);
      });

    // Fetch order data
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/getbooks`)
      .then(response => {
        setOrderData(response.data);
      })
      .catch(error => {
        console.error('Error fetching order data:', error);
      });
  }, []); // Empty dependency array means this effect will run once after the initial render

  return (
    <div className='adminhome'>
    <div className="footer-container">
   <Link to="/admin/userlist" style={{ textDecoration: 'none' }} ><div className="card3">
        <div className="card-content3">
        <p><i class="bi bi-people-fill "></i></p>
       <h1>User Details</h1>
        <p>{userData ? userData.length : 'Loading...'}</p>

        </div>
      </div></Link>
      <Link to="/admin/mechaniclist" style={{ textDecoration: 'none' }} > <div className="card3">
        <div className="card-content3">
        <p><i class="bi bi-shop"></i></p>
          <h1>Mechanic Shops</h1>
          <p>{mechanicData ? mechanicData.length : 'Loading...'}</p>

        </div>
      </div></Link>
      <Link to="/admin/orderlist" style={{ textDecoration: 'none' }} ><div className="card3">
        <div className="card-content3">
          <p><i class="bi bi-ui-checks"></i></p>
          <h1>Order Details</h1>
          <p>{orderData ? orderData.length : 'Loading...'}</p>

        </div>
      </div></Link>
    </div>
    </div>
  );
}

export default AdminHome;
