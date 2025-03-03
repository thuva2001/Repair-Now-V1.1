// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className='dashnav'>
      <Link to="/" ><img src={require("../Assests/Images/Frame_80.png")} width="200rem" height="100rem" className="img-fluid logo" alt="logo" />
</Link>
      <ul className='mx-auto' >
      <li><Link to="/admin"><i class="bi bi-grid-3x3-gap-fill"></i> DashBoard</Link></li>
        <li><Link to="/admin/userlist"><i class="bi bi-people-fill "></i> Users </Link></li>
        <li><Link to="/admin/mechaniclist"><i class="bi bi-shop"></i> Mechanics Shops </Link></li>
        <li><Link to="/admin/orderlist"><i class="bi bi-ui-checks"></i> Orders </Link></li>
      </ul>
      <Link to="/" ><button class="btn p-2 my-lg-0 my-2 button"><i class="bi bi-box-arrow-in-right"></i> Home </button></Link>

    </nav>
  );
};

export default Navbar;
