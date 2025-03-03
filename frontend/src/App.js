import React from 'react';
import './Assests/bootstrap/css/bootstrap.min.css';
import './App.css';
import './Assests/bootstrap-icons/bootstrap-icons.min.css';
import './Assests/boxicons/css/boxicons.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Fillter from './pages/Fillter';
import { Routes, Route, useLocation } from 'react-router-dom';
import MechanicForm from './pages/MechanicForm';
import Dashboard from './Admin/Dashboard';
import MechanicDetails from './pages/MechanicDetails';
import OrderForm from './pages/OrderForm';
import Contact from './components/Contact';
import AdminRoutes from './pages/AdminRoutes';
import ApprovalPage from './pages/ApprovalPage';
import OrderSubmit from './pages/OrderSubmit';

function LandingPage() {
  return (
    <div>
      <Home />
      <Contact />
    </div>
  );
}

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  
  return (
    <div>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mechanic" element={<Fillter />} />
        <Route path="/mechanicform" element={<MechanicForm />} />
        <Route path="/mechanics/:id" element={<MechanicDetails />} />
        <Route path="/orderform/:id" element={<OrderForm />} />
        <Route path="/success" element={<ApprovalPage />} />
        <Route path="/submitted" element={<OrderSubmit />}/>


      </Routes>
      {!isAdminPage && <Footer />}
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes><Dashboard /></AdminRoutes>} />
      </Routes>
    </div>
  );
}

export default App;
