// GoogleMapLoader.js
import { useEffect } from "react";

const loadGoogleMapsScript = (apiKey) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  document.head.appendChild(script);
};

const GoogleMapLoader = ({ apiKey }) => {
  useEffect(() => {
    loadGoogleMapsScript(apiKey);
  }, [apiKey]);

  return null;
};

export default GoogleMapLoader;
