import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MechanicForm = () => {
  const [ShopName, setShopName] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ShopAddress, setShopAddress] = useState("");
  const [ShopNear, setShopNear] = useState("");
  const [ShopType, setShopType] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [ShopTime, setShopTime] = useState("");
  const [ShopPhoto, setShopPhoto] = useState(null);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
        toast.error("Failed to get location. Please enter manually.");
      }
    );
  }, []);

  const handleShopPhotoChange = (e) => {
    setShopPhoto(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (
      !ShopName ||
      !latitude ||
      !longitude ||
      !ShopType ||
      !PhoneNumber ||
      !Email ||
      !ShopTime ||
      !ShopPhoto ||
      !ShopAddress ||
      !ShopNear
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("ShopName", ShopName);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("ShopAddress", ShopAddress);
    formData.append("ShopNear", ShopNear);
    formData.append("ShopType", ShopType);
    formData.append("PhoneNumber", PhoneNumber);
    formData.append("Email", Email);
    formData.append("ShopTime", ShopTime);
    formData.append("ShopPhoto", ShopPhoto);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/mechanic/createmechanic`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Shop is Registered");
        setShopName("");
        setLatitude(null);
        setLongitude(null);
        setShopAddress("");
        setShopNear("");
        setShopType("");
        setPhoneNumber("");
        setEmail("");
        setShopTime("");
        setShopPhoto(null);
      } else {
        toast.error("Failed to upload shop information.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("An error occurred while uploading shop information.");
    }
  };

  return (
    <div className="ventor-form">
      <h1>Shop Register Form</h1>
      <div className="form-container4">
        <div className="column1">
          <label>Shop Name :</label>
          <input
            type="text"
            value={ShopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />

          <label>Latitude :</label>
          <input
            type="text"
            value={latitude || ""}
            readOnly
            placeholder="Fetching..."
          />

          <label>Longitude :</label>
          <input
            type="text"
            value={longitude || ""}
            readOnly
            placeholder="Fetching..."
          />

          <label>Shop Address :</label>
          <input
            type="text"
            value={ShopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            required
          />

          <label>Nearby Shop :</label>
          <input
            type="text"
            value={ShopNear}
            onChange={(e) => setShopNear(e.target.value)}
            required
          />

          <label>Shop Photo :</label>
          <input
            type="file"
            onChange={handleShopPhotoChange}
            accept="image/*"
            required
          />
        </div>
        <div className="column1">
          <label>Shop Type :</label>
          <select
            value={ShopType}
            onChange={(e) => setShopType(e.target.value)}
            required
          >
            <option value="">Select shop type</option>
            <option value="Bike Service">Bike Service</option>
            <option value="Bike & Car Service">Bike & Car Service</option>
            <option value="Others">Others</option>
          </select>

          <label>Phone Number :</label>
          <input
            type="text"
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label>Email :</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Shop Time :</label>
          <input
            type="text"
            value={ShopTime}
            onChange={(e) => setShopTime(e.target.value)}
            required
          />
        </div>
      </div>
      <button onClick={handleUpload}>Upload</button>
      <ToastContainer />
    </div>
  );
};

export default MechanicForm;
