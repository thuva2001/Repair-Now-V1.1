// LocationPicker.js
import React, { useState, useEffect } from "react";
import GoogleMapLoader from "./GoogleMapLoader"; // Import Google map loader

const LocationPicker = ({ apiKey }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 0, lng: 0 }, // Default center position
      zoom: 15, // Set zoom level
      mapTypeId: "roadmap",
    };

    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    // Create the marker
    const markerInstance = new window.google.maps.Marker({
      position: mapInstance.getCenter(),
      map: mapInstance,
      draggable: true, // Make the marker draggable
    });

    // Update the state with marker position when dragged
    markerInstance.addListener("dragend", (e) => {
      const position = e.latLng;
      setLatitude(position.lat());
      setLongitude(position.lng());
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  useEffect(() => {
    if (window.google) {
      initializeMap(); // Initialize the map once Google Maps API is loaded
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude && marker) {
      // Move the marker to the selected position when the user selects a location
      marker.setPosition(new window.google.maps.LatLng(latitude, longitude));
      map.setCenter(new window.google.maps.LatLng(latitude, longitude));
    }
  }, [latitude, longitude, marker, map]);

  // Auto-complete feature
  useEffect(() => {
    const input = document.getElementById("autocomplete");
    const autocomplete = new window.google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLatitude(lat);
        setLongitude(lng);
      }
    });
  }, []);

  return (
    <div>
      <GoogleMapLoader apiKey={apiKey} />
      <div>
        <input
          id="autocomplete"
          type="text"
          placeholder="Search for a location"
          style={{ width: "100%", padding: "10px" }}
        />
      </div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {latitude && longitude && (
        <div>
          <p>
            Selected Location: Latitude {latitude}, Longitude {longitude}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
