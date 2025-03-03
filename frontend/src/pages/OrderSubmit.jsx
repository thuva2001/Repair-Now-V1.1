// OrderSubmitted.js
import React from 'react';
import { Link } from "react-router-dom"; // Import Link


function OrderSubmit() {
  return (
    <div className="order-submit-container">
        <p className="check-icon"><i className="bi bi-check-circle-fill"></i></p>
        <h2>Order Submitted</h2>
        <p className="success-message">Your order has been submitted successfully!</p>
        <Link  className="btn btn-outline-dark" type="button" to='/' >Ok</Link>

    </div>
  );
}

export default OrderSubmit;
