import { NextResponse } from 'next/server';

const REPLIERS_BASE = 'https://api.repliers.io';

/**
 * GET /api/listings
 * Proxies to Repliers API so the API key stays server-side.
 * Supported query params:
 *   city, type, status, minPrice, maxPrice, minBeds, minBaths,
 *   resultsPerPage, pageNum, sortBy
 */
export async function GET(request) {
  const apiKey = process.env.REPLIERS_API_KEY;

  const { searchParams } = new URL(request.url);

  // Build Repliers params
  const params = new URLSearchParams();
  const forward = ['city', 'type', 'status', 'minPrice', 'maxPrice', 'minBeds', 'minBaths', 'resultsPerPage', 'pageNum', 'sortBy'];
  forward.forEach(key => {
    const val = searchParams.get(key);
    if (val) params.set(key, val);
  });

  // Defaults
  if (!params.has('status'))         params.set('status', 'A');
  if (!params.has('resultsPerPage')) params.set('resultsPerPage', '20');
  if (!params.has('pageNum'))        params.set('pageNum', '1');

  // If no API key configured, return mock data for development
  if (!apiKey || apiKey === 'your_repliers_api_key_here') {
    return NextResponse.json(getMockListings(), { status: 200 });
  }

  try {
    const res = await fetch(`${REPLIERS_BASE}/listings?${params.toString()}`, {
      headers: {
        'REPLIERS-API-KEY': apiKey,
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // Cache 5 minutes
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Repliers API error:', res.status, text);
      return NextResponse.json({ error: 'Failed to fetch listings', status: res.status }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Repliers fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/listings/[mlsNumber]
 * Handled separately in /app/api/listings/[mlsNumber]/route.js
 */

// ─── Mock data for development ──────────────────────────────────────────────
function getMockListings() {
  const cities = ['Saint John', 'Rothesay', 'Quispamsis'];
  const streets = ['Princess Street', 'King Street', 'Millidge Avenue', 'Loch Lomond Road', 'Red Head Road', 'Gondola Point Road', 'Hampton Road', 'Old Black River Road'];
  const types = ['Detached', 'Semi-Detached', 'Townhouse', 'Condo'];

  const listings = Array.from({ length: 12 }, (_, i) => {
    const city   = cities[i % 3];
    const type   = types[i % 4];
    const price  = 250000 + Math.round(Math.random() * 600000 / 1000) * 1000;
    const beds   = 2 + (i % 4);
    const baths  = 1 + (i % 3);
    const sqft   = String(900 + Math.round(Math.random() * 1600));

    // Saint John NB approximate coordinates with slight variation
    const baseLat = 45.2733 + (i % 3 === 1 ? 0.05 : i % 3 === 2 ? 0.03 : 0);
    const baseLng = -66.0633 + (i % 3 === 1 ? 0.03 : i % 3 === 2 ? 0.06 : 0);

    return {
      mlsNumber: `NB${100000 + i}`,
      status: 'A',
      type,
      class: 'ResidentialProperty',
      listPrice: price,
      address: {
        streetNumber: String(100 + i * 17),
        streetName: streets[i % streets.length],
        city,
        state: 'NB',
        country: 'Canada',
        zip: 'E2K 1J5',
      },
      details: {
        numBedrooms: String(beds),
        numBathrooms: String(baths),
        sqft,
        yearBuilt: String(1980 + (i % 40)),
        propertyType: type,
      },
      images: [
        `https://placehold.co/800x560/003149/E2E2E2?text=${encodeURIComponent(type + ' - ' + city)}`,
      ],
      map: {
        latitude:  String((baseLat + (i * 0.004 - 0.02)).toFixed(6)),
        longitude: String((baseLng + (i * 0.006 - 0.03)).toFixed(6)),
      },
    };
  });

  return {
    listings,
    count: listings.length,
    numPages: 1,
    page: 1,
  };
}
