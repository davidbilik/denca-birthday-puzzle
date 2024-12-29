'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for the missing default marker icon in Leaflet with Next.js
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type MapProps = {
  onClick: (lat: number, lng: number) => void;
  selectedPoint: [number, number] | null;
  bounds: [[number, number], [number, number]];
  instanceId: string;
};

function MapEvents({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => onClick(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

export default function Map({ onClick, selectedPoint, bounds, instanceId }: MapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="w-full h-full bg-background/10 animate-pulse rounded-lg" />;
  }

  return (
    <div id={`map-container-${instanceId}`} className="w-full h-full">
      <MapContainer
        bounds={bounds}
        zoom={4}
        className="w-full h-full"
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          opacity={0.8}
        />
        <MapEvents onClick={onClick} />
        {selectedPoint && (
          <Marker 
            position={selectedPoint}
            key={`marker-${selectedPoint[0]}-${selectedPoint[1]}`}
          />
        )}
      </MapContainer>
    </div>
  );
} 