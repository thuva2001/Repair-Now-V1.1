import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import UserList from './UserList';
import MechanicList from './MechanicList';
import OrderList from './OrderList';
import AdminHome from './AdminHome';
import AdminFooter from './AdminFooter';

function Dashboard() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/mechaniclist" element={<MechanicList />} />
        <Route path="/orderlist" element={<OrderList />} />
      </Routes>
      <AdminFooter/>
    </div>
  );
}

export default Dashboard;
