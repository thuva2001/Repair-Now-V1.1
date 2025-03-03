import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/all-users`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    // Redirect to edit page or open modal for editing
    console.log('Edit user:', id);
  };

  const handleEnableDisable = async (id, isActive) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}/toggle`, null);
      const updatedUser = response.data.data;
      setUsers(users.map((user) => (user._id === id ? updatedUser : user)));
      console.log(`User ${isActive ? 'disabled' : 'enabled'}:`, id);
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='userlist'>
      <h2>User List</h2>
      <div className="filter-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by User ID "
            value={searchTerm}
            onChange={handleSearch}
            className="search-box"
          />
          <i className="bi bi-search search-icon"></i> {/* Search icon */}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user._id.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={`btn ${user.isActive ? 'btn-danger' : 'btn-success'} btn-sm mr-2`}
                    onClick={() => handleEnableDisable(user._id, user.isActive)}
                  >
                    {user.isActive ? 'Disable' : 'Enable'} <i class="bi bi-person-fill-slash"></i>
                  </button>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit <i class="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
