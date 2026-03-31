'use client';

import { useEffect, useRef } from 'react';

// Dynamically load Leaflet only on the client
export default function MapView({ listings = [], center = [45.2733, -66.0633], zoom = 12 }) {
  const mapRef    = useRef(null);
  const mapInst   = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined' || mapInst.current) return;

    // Dynamically import Leaflet
    import('leaflet').then(L => {
      // Fix default icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl:      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInst.current = { map, L };
      addMarkers(listings, map, L);
    });

    return () => {
      if (mapInst.current?.map) {
        mapInst.current.map.remove();
        mapInst.current = null;
      }
    };
  }, []);

  // Update markers when listings change
  useEffect(() => {
    if (!mapInst.current) return;
    const { map, L } = mapInst.current;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    addMarkers(listings, map, L);
  }, [listings]);

  function addMarkers(list, map, L) {
    list.forEach(listing => {
      const lat = parseFloat(listing.map?.latitude);
      const lng = parseFloat(listing.map?.longitude);
      if (!lat || !lng) return;

      const price = listing.listPrice
        ? new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(listing.listPrice)
        : '';

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          background: var(--teal, #008C9A);
          color: white;
          font-family: Montserrat, sans-serif;
          font-weight: 800;
          font-size: 11px;
          padding: 5px 8px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 3px 12px rgba(0,140,154,0.4);
          position: relative;
        ">
          ${price}
          <div style="
            position: absolute; bottom: -6px; left: 50%;
            transform: translateX(-50%);
            width: 0; height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 7px solid var(--teal, #008C9A);
          "></div>
        </div>`,
        iconAnchor: [30, 36],
        popupAnchor: [0, -40],
      });

      const addr = listing.address
        ? `${listing.address.streetNumber || ''} ${listing.address.streetName || ''}, ${listing.address.city || ''}`
        : 'Property';

      const popup = `
        <div style="font-family: Lato, sans-serif; min-width: 180px;">
          <p style="font-family: Montserrat, sans-serif; font-weight: 700; font-size: 13px; color: var(--navy, #003149); margin-bottom: 4px;">${price}</p>
          <p style="font-size: 12px; color: #555; margin-bottom: 8px;">${addr.trim()}</p>
          <div style="display: flex; gap: 12px; font-size: 11px; color: #888; margin-bottom: 10px;">
            <span>${listing.details?.numBedrooms || '—'} beds</span>
            <span>${listing.details?.numBathrooms || '—'} baths</span>
          </div>
          <a href="/listings/${listing.mlsNumber || ''}" style="
            display: block;
            background: var(--teal, #008C9A);
            color: white;
            text-align: center;
            padding: 6px 12px;
            border-radius: 4px;
            font-family: Montserrat, sans-serif;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            text-decoration: none;
          ">View Listing</a>
        </div>`;

      const marker = L.marker([lat, lng], { icon }).bindPopup(popup);
      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    />
  );
}
