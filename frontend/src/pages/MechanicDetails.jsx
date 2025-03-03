import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom

function MechanicDetails() {
  const [mechanic, setMechanic] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/mechanic/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMechanic(data);
      })
      .catch((error) => console.error("Error fetching shop data:", error));
  }, [id]);

  return (
    <section id="portfolio-details" className="portfolio-details">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-8">
            <div className="portfolio-details-slider swiper">
              <div className="swiper-wrapper align-items-center">
                {mechanic && (
                  <div className="swiper-slide">
                    <img src={mechanic.ShopPhoto.url} alt={mechanic.ShopName}  className="img-fluid"/>
                  </div>
                )}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="portfolio-info">
             <b><h1>{mechanic ? mechanic.ShopName : "Shop Details"}</h1></b><br/>
              <ul>
                <li><strong>Location</strong> : {mechanic && mechanic.Location}</li>
                <li><strong>Shop Address</strong> : {mechanic && mechanic.ShopAddress}</li>
                <li><strong>Shop Near</strong> : {mechanic && mechanic.ShopNear}</li>
                <li><strong>Shop Type</strong> : {mechanic && mechanic.ShopType}</li>
                <li><strong>Phone Number</strong> : {mechanic && mechanic.PhoneNumber}</li>
                <li><strong>Email</strong> : {mechanic && mechanic.Email}</li>
                <li><strong>Shop Time</strong> : {mechanic && mechanic.ShopTime}</li>
                {/* Add other shop details here */}
              </ul>
            </div>
            <div className="portfolio-description">
            
              {mechanic ?<>
                <Link to={`/orderform/${mechanic._id}`}> {/* Link to OrderForm */}
                  <button className="upload1" type="button">Book Mechanic</button>
                </Link>
                </>
               : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MechanicDetails;
