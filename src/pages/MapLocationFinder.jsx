import { Search, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import L from 'leaflet';
import '../styles/MapLocationFinder.css'; // Import CSS file

const stations = [
  {
    id: 1,
    name: "State Police Station",
    hours: "Monday - Friday",
    time: "10:00am - 14:00",
    location: "MPD/CRS, State Town",
    status: "active",
    distance: "2.3km",
    coordinates: [51.505, -0.09], // Example coordinates
  },
  {
    id: 2,
    name: "Police Station",
    description: "Sheriff's deployment - MPD/PCRS",
    status: "active",
    coordinates: [51.515, -0.1], // Example coordinates
  }
];

const LocationFinder = () => {
  const location = useLocation();
  const { linkText } = location.state || {};

  useEffect(() => {
    let map = L.map("map", { center: [51.505, -0.09], zoom: 13 });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each station
    stations.forEach((station) => {
      L.marker(station.coordinates)
        .addTo(map)
        .bindPopup(`<b>${station.name}</b><br>${station.location || ''}`)
        .openPopup();
    });

    return () => {
      map.remove(); // Clean up map on unmount to prevent re-initialization
    };
  }, []);

  return (
    <div className="finder-container">
      {/* Search Header */}
      <div className="top-container">
      <div>
        <select className="select">
          <option>Sort by</option>
        </select>
      </div>
      <div className="text">
        Wheelchair-accessible entrance
      </div>
      <button className="stop">
        Stop
      </button>
    </div>
      <div className="search-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder={linkText}
            className="search-input"
          />
          <Search className="search-icon" size={20} />
          <button className="map-button">
            <MapPin size={20} />
          </button>
        </div>
      </div>

      
      {/* Map Section */}
      <div className="map-section">
        <div id="map" style={{ height: "400px", width: "100%" }}></div>
      </div>

      {/* Station Listings */}
      <div className="station-listings">
        <div className="listings-content">
          {stations.map((station) => (
            <div key={station.id} className="station-card">
              <div className="card-header">
                <div>
                  <h3 className="station-name">{station.name}</h3>
                  {station.hours && (
                    <div className="station-details">
                      <p>{station.hours}</p>
                      <p>{station.time}</p>
                      <p>{station.location}</p>
                    </div>
                  )}
                  {station.description && (
                    <p className="station-description">{station.description}</p>
                  )}
                </div>
                {station.distance && (
                  <span className="station-distance">{station.distance}</span>
                )}
              </div>
              {/* Status Indicator */}
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span className="status-text">Open</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationFinder;
