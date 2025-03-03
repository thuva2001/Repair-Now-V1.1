import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/getbooks`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // const handleEdit = (id) => {
  //   console.log('Edit book:', id);
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/order/${id}`);
      // If delete is successful, remove the deleted book from the state
      setBooks(books.filter(book => book._id !== id));
      console.log('Book deleted:', id);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className='userlist'>
      <h2>Booking List</h2>
      <div className="filter-search">
      <div className="search-container">

        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={handleSearch}
          className="search-box"
          />
        <i className="bi bi-search search-icon"></i>
        </div>

      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th> Order ID</th>
            <th>Mechanic ID</th>
            <th>Customer Name</th>
            <th>Location</th>
            <th>Contact Number</th>
            <th>Vehicle Type</th>
            <th>Problem</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books
          .filter(book => book._id.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((book) => (
            <tr key={book._id}>
              <td>{book._id}</td>
              <td>{book.MechanicId}</td>
              <td>{book.CustomerName}</td>
              <td>{book.Location}</td>
              <td>{book.ContactNumber}</td>
              <td>{book.VehicleType}</td>
              <td>{book.Problem}</td>
              <td>
                {/* <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => handleEdit(book._id)}
                >
                  Edit <i class="bi bi-pencil-square"></i>
                </button> */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
