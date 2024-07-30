"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const customMarker = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Ensure this URL points to a valid image
  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const SalesMap = ({ salesTerritories }) => {
  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      {salesTerritories.map((territory, idx) => (
        <Marker key={idx} position={territory.position} icon={customMarker}>
          <Popup>
            <div>
              <h3>{territory.name}</h3>
              <p>Rep: {territory.rep}</p>
              <p>Email: {territory.email}</p>
              <p>Phone: {territory.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SalesMap;
