import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Filter() {
  const [mechanics, setMechanics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [radius, setRadius] = useState(""); // Allow user input for distance

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async (distance = null, useLocation = false) => {
    let url = `${process.env.REACT_APP_SERVER_URL}/api/mechanic/getmechanics`;

    if (useLocation && lat !== null && lng !== null && distance) {
      url += `?lat=${lat}&lng=${lng}&maxDistance=${distance}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMechanics(data);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          fetchMechanics(radius || 5000, true);
        },
        (error) => console.error("Geolocation error:", error)
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  };

  const filteredMechanics = mechanics.filter((mechanic) =>
    mechanic.ShopAddress?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMechanics.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container_fill">
      <div className="d-flex align-items-center gap-2">
        
        <input
          type="text"
          className="form-control"
          placeholder="Where are you broken down?"
          value={searchQuery}
          onChange={handleSearch}
        />
        <i className="bx bx-search fs-4"></i>
      </div>

      <div className="d-flex gap-2  my-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter max distance (meters)"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
        <button
          onClick={() => fetchMechanics(radius || 5000, true)}
          className="btn btn-primary"
        >
          Search Nearby
        </button>
        <button onClick={() => fetchMechanics()} className="btn btn-secondary">
          Show All Mechanics
        </button>
        <button onClick={useCurrentLocation} className="btn btn-success">
          Use My Location
        </button>
      </div>

      <div className="images1">
      {currentItems.map((mechanic) => (
  <Link
    to={`/mechanics/${mechanic._id}`}
    key={mechanic._id}
    style={{ textDecoration: "none" }}
  >
    <div className="card1" data-name={mechanic.ShopName}>
      {mechanic.ShopPhoto && mechanic.ShopPhoto.url ? (
        <img src={mechanic.ShopPhoto.url} alt={mechanic.ShopName} />
      ) : (
        <img src="/placeholder.jpg" alt="No Image Available" />
      )}
      <div className="card-content1">
        <h1>{mechanic.ShopName}</h1>
        <h2>{mechanic.Location}</h2>
        <h6>{mechanic.ShopNear}</h6>
      </div>
    </div>
  </Link>
))}

      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({
            length: Math.ceil(filteredMechanics.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
              disabled={
                currentPage ===
                Math.ceil(filteredMechanics.length / itemsPerPage)
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Filter;
  
