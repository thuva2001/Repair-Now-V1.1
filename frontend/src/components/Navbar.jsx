import '../Assests/bootstrap/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate(); 

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    // Perform logout actions (remove token, etc.)
    // Send a POST request to the server-side logout endpoint
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem('userInfo');
        toast.success("Logout success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        navigate('/');
      } else {
        throw new Error('Logout failed.');
      }
    })
    .catch(error => {
      console.error(error);
    });
  };
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" id="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000/">
            <img src={require("../Assests/Images/Frame_80.png")} width="200rem" height="100rem" className="img-fluid" alt="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto" style={{ gap: '1rem' }}>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#section_2">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact Us</a>
              </li>
              {user && user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Dashboard</Link>
                </li>
              )}
            </ul>
            {user ? (
              <div className="dropdown">
                <button className="btn p-2 my-lg-0 my-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle"></i> {user.name}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout <i class="bi bi-box-arrow-left"></i></button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn p-2 my-lg-0 my-2">Login <i className="bi bi-box-arrow-in-right"></i></button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
