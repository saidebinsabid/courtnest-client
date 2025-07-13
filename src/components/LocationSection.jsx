
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const LocationSection = () => {
  const position = [23.8311, 90.3658];
  const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

  return (
    <section className="bg-gray-100 py-16 relative">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">📍 Our Location</h2>
        <p className="text-gray-700 mb-4">
          Mirpur DOHS, Dhaka, Bangladesh
        </p>

        <MapContainer className="leaflet-map z-0"  center={position} zoom={13} style={{ height: '400px', width: '100%', zIndex: 0  }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={redIcon}>
            <Popup>We are here! You can Enjoy Your Game Time</Popup>
          </Marker>
        </MapContainer>

        <div className="mt-4">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=23.8311,90.3658"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-black hover:text-white text-black font-semibold px-6 py-2 rounded-md"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
