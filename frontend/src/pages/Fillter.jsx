import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

function Filter() {
  const [mechanics, setMechanics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/getmechanics`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMechanics(data);
          console.log("data",data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const filteredMechanics = mechanics.filter(
   (mechanic) =>
     mechanic.ShopAddress &&
     mechanic.ShopAddress.toLowerCase().includes(searchQuery.toLowerCase())
 );

  const currentItems = filteredMechanics.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container_fill">
      <div className="search-box1">
        <i className="bx bx-search"></i>
        <input
          type="text"
          placeholder="Where are u Break down?"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="images1">
        {currentItems.map((mechanic) => (
          <Link
            to={`/mechanics/${mechanic._id}`}
            key={mechanic._id}
            style={{ textDecoration: "none" }}
          >
            {/* Wrap each card with Link */}
            <div className="card1" data-name={mechanic.ShopName}>
              <img src={mechanic.ShopPhoto.url} alt={mechanic.ShopName} />
              <div className="card-content1">
                <h1>{mechanic.ShopName}</h1>
                <h2>{mechanic.Location}</h2>
                <h6>{mechanic.ShopNear}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <nav>
  <ul className="pagination">
    <li className="page-item">
      <button onClick={() => paginate(currentPage - 1)} className="page-link" disabled={currentPage === 1}>
        Previous
      </button>
    </li>
    {Array.from({ length: Math.ceil(filteredMechanics.length / itemsPerPage) }).map((_, index) => (
      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
        <button onClick={() => paginate(index + 1)} className="page-link">
          {index + 1}
        </button>
      </li>
    ))}
    <li className="page-item">
      <button onClick={() => paginate(currentPage + 1)} className="page-link" disabled={currentPage === Math.ceil(filteredMechanics.length / itemsPerPage)}>
        Next
      </button>
    </li>
  </ul>
</nav>

    </div>
  );
}

export default Filter;
