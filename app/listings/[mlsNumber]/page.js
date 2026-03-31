'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

function formatPrice(price) {
  if (!price) return 'Price upon request';
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(price);
}

export default function ListingDetailPage() {
  const { mlsNumber } = useParams();
  const [listing,      setListing]      = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [activePhoto,  setActivePhoto]  = useState(0);
  const [showContact,  setShowContact]  = useState(false);

  useEffect(() => {
    const apiKey = typeof window !== 'undefined' ? '' : '';
    fetch(`/api/listings`)
      .then(r => r.json())
      .then(data => {
        const found = (data.listings || []).find(l => l.mlsNumber === mlsNumber);
        setListing(found || null);
      })
      .catch(() => setListing(null))
      .finally(() => setLoading(false));
  }, [mlsNumber]);

  if (loading) {
    return (
      <div style={{ paddingTop: 120, minHeight: '60vh' }} className="container-wide">
        <div className="skeleton" style={{ height: 400, borderRadius: 16, marginBottom: 32 }} />
        <div className="skeleton" style={{ height: 28, width: '50%', marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 18, width: '30%' }} />
      </div>
    );
  }

  if (!listing) {
    return (
      <div style={{ paddingTop: 120, minHeight: '60vh' }} className="container-wide text-center">
        <span style={{ fontSize: 48 }}>🏘️</span>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 28, color: 'var(--navy)', marginTop: 16 }}>
          Listing Not Found
        </h1>
        <p style={{ fontFamily: 'Lato, sans-serif', color: 'var(--gray)', marginTop: 8 }}>
          MLS# {mlsNumber} could not be found or may have been sold.
        </p>
        <Link href="/listings" className="btn-primary mt-8 inline-flex">← Back to Listings</Link>
      </div>
    );
  }

  const photos = listing.images?.length
    ? listing.images
    : [`https://placehold.co/1200x800/003149/E2E2E2?text=${encodeURIComponent((listing.address?.streetName || 'Property'))}`];

  const streetAddr = `${listing.address?.streetNumber || ''} ${listing.address?.streetName || ''}`.trim();
  const cityAddr   = `${listing.address?.city || ''}, ${listing.address?.state || 'NB'}`;

  return (
    <div style={{ paddingTop: 80 }}>
      <div className="container-wide py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6" style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--gray)' }}>
          <Link href="/listings" className="hover:text-teal-500 transition-colors duration-200">Listings</Link>
          <span>›</span>
          <span style={{ color: 'var(--navy)' }}>{streetAddr}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Photos + details */}
          <div className="lg:col-span-8">
            {/* Main photo */}
            <div className="rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: '16/10' }}>
              <img
                src={photos[activePhoto]}
                alt={streetAddr}
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </div>
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-150"
                    style={{ width: 80, height: 56, border: `2px solid ${activePhoto === i ? 'var(--teal)' : 'transparent'}` }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="mt-8">
              <h1
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--navy)',
                }}
              >
                {streetAddr}
              </h1>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 16, color: 'var(--gray)', marginTop: 4 }}>{cityAddr}</p>

              <div className="flex flex-wrap items-center gap-4 mt-5 pt-5" style={{ borderTop: '1px solid var(--light)' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '-0.03em', color: 'var(--teal)' }}>
                  {formatPrice(listing.listPrice)}
                </p>
                <span
                  className="px-3 py-1.5 rounded"
                  style={{ background: 'rgba(0,140,154,0.1)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11, color: 'var(--teal)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  {listing.type || 'Residential'}
                </span>
                <span
                  className="px-3 py-1.5 rounded"
                  style={{ background: 'rgba(0,180,80,0.1)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11, color: '#0a7a2f', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  Active
                </span>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { icon: '🛏', label: 'Bedrooms',  value: listing.details?.numBedrooms || '—' },
                  { icon: '🚿', label: 'Bathrooms', value: listing.details?.numBathrooms || '—' },
                  { icon: '📐', label: 'Sq. Feet',  value: listing.details?.sqft ? Number(listing.details.sqft).toLocaleString() : '—' },
                  { icon: '🏗️',  label: 'Year Built',value: listing.details?.yearBuilt || '—' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="rounded-xl p-4 text-center" style={{ background: 'white', border: '1.5px solid var(--light)' }}>
                    <span style={{ fontSize: 22, display: 'block', marginBottom: 4 }}>{icon}</span>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 18, color: 'var(--navy)', lineHeight: 1 }}>{value}</p>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--gray)', marginTop: 3 }}>{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--light)' }}>
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--gray)' }}>
                  MLS® {listing.mlsNumber} · {listing.address?.city}, {listing.address?.state}
                </p>
              </div>

              {/* Map */}
              {listing.map?.latitude && (
                <div className="mt-8">
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>
                    Location
                  </h3>
                  <div style={{ height: 280 }}>
                    <MapView
                      listings={[listing]}
                      center={[parseFloat(listing.map.latitude), parseFloat(listing.map.longitude)]}
                      zoom={15}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 8px 40px rgba(0,49,73,0.12)', border: '1.5px solid var(--light)' }}
              >
                <div className="p-6">
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 24, color: 'var(--teal)', letterSpacing: '-0.02em' }}>
                    {formatPrice(listing.listPrice)}
                  </p>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--gray)', marginTop: 4 }}>
                    {streetAddr}, {cityAddr}
                  </p>

                  <div className="flex flex-col gap-3 mt-6">
                    <Link href="/contact" className="btn-primary justify-center">
                      Book a Showing
                    </Link>
                    <a href="tel:+15061234567" className="btn-outline justify-center">
                      Call Joel: (506) 123-4567
                    </a>
                    <a href="mailto:joel@joelmcelhinney.ca" className="btn-outline justify-center">
                      Email Joel
                    </a>
                  </div>

                  <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--light)' }}>
                    <img src="/joel-photo.jpg" alt="Joel McElhinney" className="w-12 h-12 rounded-full object-cover object-top float-left mr-3 mb-1" />
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>Joel McElhinney</p>
                    <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--gray)' }}>REALTOR® — EXIT Realty Specialists</p>
                    <div style={{ clear: 'both' }} />
                  </div>
                </div>

                {/* Calculators quick link */}
                <div className="p-4" style={{ background: 'rgba(0,140,154,0.06)', borderTop: '1px solid var(--light)' }}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, color: 'var(--navy)', marginBottom: 4 }}>
                    Estimate your payments
                  </p>
                  <Link href="/calculators#mortgage" style={{ fontFamily: 'Lato, sans-serif', fontSize: 13, color: 'var(--teal)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                    Open Mortgage Calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
