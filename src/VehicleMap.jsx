import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const vehicleIcon = new L.Icon({
  iconUrl: '/car.png',
  iconSize: [30, 30],
  iconAnchor: [25, 25],
});

const VehicleMap = () => {
  const startLocation = [40.785091, -73.968285];  // Central Park
  const endLocation = [40.758896, -73.985130];    // Times Square

  const [position, setPosition] = useState(startLocation);
  const [path, setPath] = useState([startLocation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPos => {
        const [lat1, lng1] = prevPos;
        const [lat2, lng2] = endLocation;

        // Increase the step size to move the vehicle faster
        const newLat = lat1 + (lat2 - lat1) * 0.01;
        const newLng = lng1 + (lng2 - lng1) * 0.01;

        const newPosition = [newLat, newLng];

        // Stop when close to the end location
        if (Math.abs(newLat - lat2) < 0.0001 && Math.abs(newLng - lng2) < 0.0001) {
          clearInterval(interval);
        }

        setPath(prevPath => [...prevPath, newPosition]);
        return newPosition;
      });
    }, 200); // Reduce the interval time for faster updates (e.g., 200ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={startLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={vehicleIcon} />
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
};

export default VehicleMap;
