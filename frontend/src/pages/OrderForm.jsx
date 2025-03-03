// OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

function OrderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CustomerName: '',
    Location: '',
    ContactNumber: '',
    VehicleType: '',
    Problem: '',
    id: id
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.CustomerName || !formData.Location || !formData.ContactNumber || !formData.VehicleType || !formData.Problem) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/order/createorder`, formData);
      console.log(response.data);
      // Show success message using Toastify

      // Clear form fields after successful submission
      setFormData({
        CustomerName: '',
        Location: '',
        ContactNumber: '',
        VehicleType: '',
        Problem: '',
        id: id
      });

      // Redirect to order submitted page
      navigate( '/submitted');
      toast.success('Order submitted successfully!');

    } catch (error) {
      console.error('Error creating mechanic order:', error);
      // Handle error, show an error message to the user
    }
  };

  return (
    <div className='form-container2'>
      <h2> Mechanic Order </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="CustomerName"
          placeholder="Customer Name"
          value={formData.CustomerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Location"
          placeholder="Location"
          value={formData.Location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ContactNumber"
          placeholder="Contact Number"
          value={formData.ContactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="VehicleType"
          placeholder="Vehicle Type"
          value={formData.VehicleType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Problem"
          placeholder="Problem"
          value={formData.Problem}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Order</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default OrderForm;
