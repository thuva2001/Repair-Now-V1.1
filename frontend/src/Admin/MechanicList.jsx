import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const MechanicList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMechanic, setEditingMechanic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust this value as needed

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/getmechanic`,{ withCredentials: true });
        setMechanics(response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    fetchMechanics();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/${id}`,);
      setEditingMechanic(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching mechanic for edit:', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMechanic({ ...editingMechanic, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/${editingMechanic._id}`, editingMechanic);
      // Refresh the mechanic list after update
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/getmechanic`);
      setMechanics(response.data);
      setEditingMechanic(null); // Clear the editing state
      setShowModal(false);
    } catch (error) {
      console.error('Error updating mechanic:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/${id}`);
      setMechanics(prevMechanics => prevMechanics.filter(mechanic => mechanic._id !== id));
    } catch (error) {
      console.error('Error deleting mechanic:', error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/${id}`, { ispost: true });
      // Update mechanic list with the updated mechanic
      setMechanics(mechanics.map(mechanic => mechanic._id === id ? response.data : mechanic));
    } catch (error) {
      console.error('Error verifying mechanic:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredMechanics = mechanics.filter(mechanic => mechanic._id.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentItems = filteredMechanics.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="userlist">
      <h2>Mechanic List</h2>
      <div className="filter-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Mechanic ID"
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
            <th>Mechanic ID</th>
            <th>Shop Name</th>
            <th>Location</th>
            <th>Shop Address</th>
            <th>Shop Near</th>
            <th>Shop Type</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Shop Time</th>
            <th>Shop Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((mechanic) => (
            <tr key={mechanic._id}>
              <td>{mechanic._id}</td>
              <td>{mechanic.ShopName}</td>
              <td>{mechanic.Location}</td>
              <td>{mechanic.ShopAddress}</td>
              <td>{mechanic.ShopNear}</td>
              <td>{mechanic.ShopType}</td>
              <td>{mechanic.PhoneNumber}</td>
              <td>{mechanic.Email}</td>
              <td>{mechanic.ShopTime}</td>
              <td>
                {mechanic.ShopPhoto && (
                  <img src={mechanic.ShopPhoto.url} alt="Shop" style={{ width: '100px', height: 'auto' }} />
                )}
              </td>
              <td className='button-container'>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(mechanic._id)}>Edit <i class="bi bi-pencil-square"></i></button>
                <button className="btn btn-danger btn-sm mr-2" onClick={() => handleDelete(mechanic._id)}>Delete <i class="bi bi-trash"></i></button>
                {!mechanic.ispost && (
                  <button className="btn btn-success btn-sm" onClick={() => handleVerify(mechanic._id)}>Verify <i class="bi bi-patch-check"></i></button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          {Array.from({ length: Math.ceil(filteredMechanics.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className='page-item'>
              <button onClick={() => paginate(index + 1)} className='page-link'>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <Modal show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Mechanic</Modal.Title>
        </Modal.Header >
        <Modal.Body className='edit-form'>
          
          <div >
            <label>Shop Name</label>
            <input type="text" name="ShopName" value={editingMechanic?.ShopName} onChange={handleEditInputChange} />
          </div>
          <div>
            <label>Location</label>
            <input type="text" name="Location" value={editingMechanic?.Location} onChange={handleEditInputChange} />
          </div>
          <div>
            <label>Shop Address</label>
            <input type="text" name="ShopAddress" value={editingMechanic?.ShopAddress} onChange={handleEditInputChange} />
          </div>
          <div>
            <label>Shop Near</label>
            <input type="text" name="ShopNear" value={editingMechanic?.ShopNear} onChange={handleEditInputChange} />
          </div>
          <div>
            <label>Shop Type</label>
            <input type="text" name="ShopType" value={editingMechanic?.ShopType} onChange={handleEditInputChange} />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="text" name="PhoneNumber" value={editingMechanic?.PhoneNumber} onChange={handleEditInputChange} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="Email" value={editingMechanic?.Email} onChange={handleEditInputChange} />
          </div>
          <div>
            <label>Shop Time</label>
            <input type="text" name="ShopTime" value={editingMechanic?.ShopTime} onChange={handleEditInputChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MechanicList;
