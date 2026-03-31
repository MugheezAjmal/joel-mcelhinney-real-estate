'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import PropertyCard from '@/components/PropertyCard';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const CITIES    = ['All Cities', 'Saint John', 'Rothesay', 'Quispamsis', 'Grand Bay-Westfield', 'Hampton', 'Sussex'];
const TYPES     = ['All Types', 'Detached', 'Semi-Detached', 'Townhouse', 'Condo', 'Land'];
const BED_OPTS  = ['Any', '1+', '2+', '3+', '4+', '5+'];
const BATH_OPTS = ['Any', '1+', '2+', '3+'];
const SORT_OPTS = [
  { value: 'createdOnDesc', label: 'Newest First' },
  { value: 'listPriceDesc',  label: 'Price: High to Low' },
  { value: 'listPriceAsc',   label: 'Price: Low to High' },
];

function formatPrice(n) {
  if (!n) return '$0';
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

export default function ListingsPage() {
  const [view,        setView]        = useState('grid'); // 'grid' | 'map'
  const [listings,    setListings]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [totalCount,  setTotalCount]  = useState(0);
  const [numPages,    setNumPages]    = useState(1);
  const [page,        setPage]        = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters
  const [city,     setCity]     = useState('All Cities');
  const [type,     setType]     = useState('All Types');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds,  setMinBeds]  = useState('Any');
  const [minBaths, setMinBaths] = useState('Any');
  const [sortBy,   setSortBy]   = useState('createdOnDesc');
  const [search,   setSearch]   = useState('');

  const fetchListings = useCallback(async (resetPage = false) => {
    setLoading(true);
    const currentPage = resetPage ? 1 : page;
    if (resetPage) setPage(1);

    const params = new URLSearchParams();
    if (city !== 'All Cities')   params.set('city', city);
    if (type !== 'All Types')    params.set('type', type.toLowerCase().replace(/ /g, '-'));
    if (minPrice)                params.set('minPrice', minPrice);
    if (maxPrice)                params.set('maxPrice', maxPrice);
    if (minBeds  !== 'Any')      params.set('minBeds',  minBeds.replace('+', ''));
    if (minBaths !== 'Any')      params.set('minBaths', minBaths.replace('+', ''));
    params.set('sortBy',          sortBy);
    params.set('pageNum',         String(currentPage));
    params.set('resultsPerPage',  '12');

    try {
      const res  = await fetch(`/api/listings?${params.toString()}`);
      const data = await res.json();
      setListings(data.listings || []);
      setTotalCount(data.count || 0);
      setNumPages(data.numPages || 1);
    } catch {
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [city, type, minPrice, maxPrice, minBeds, minBaths, sortBy, page]);

  useEffect(() => { fetchListings(); }, [page]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchListings(true); }, [city, type, minPrice, maxPrice, minBeds, minBaths, sortBy]);

  const filteredListings = search.trim()
    ? listings.filter(l => {
        const q = search.toLowerCase();
        return (
          (l.address?.city || '').toLowerCase().includes(q) ||
          (l.address?.streetName || '').toLowerCase().includes(q) ||
          (l.mlsNumber || '').toLowerCase().includes(q)
        );
      })
    : listings;

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Page header */}
      <div style={{ background: 'var(--navy)', padding: '48px 0 40px' }}>
        <div className="container-wide">
          <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 10, marginBottom: 10 }}>
            MLS® Listings
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '-0.03em',
                color: 'white',
                lineHeight: 1,
              }}
            >
              Properties for Sale
            </h1>
            <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
              {totalCount > 0 ? `${totalCount} properties found` : 'Searching…'}
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide py-8">
        {/* Search + controls bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by city, street, or MLS#…"
              className="input-field pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 16 }}>🔍</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="lg:hidden flex items-center gap-2 btn-outline"
              style={{ padding: '10px 16px', fontSize: 12 }}
            >
              Filters {sidebarOpen ? '×' : '⊞'}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-field"
              style={{ width: 'auto', minWidth: 180 }}
            >
              {SORT_OPTS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* View toggle */}
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1.5px solid var(--light)' }}>
              {[
                { v: 'grid', icon: '▦', label: 'Grid' },
                { v: 'map',  icon: '🗺', label: 'Map'  },
              ].map(({ v, icon, label }) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  title={label}
                  className="px-3 py-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-teal-500"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    background: view === v ? 'var(--navy)' : 'white',
                    color:      view === v ? 'white'       : 'var(--gray)',
                  }}
                  aria-pressed={view === v}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={`${sidebarOpen ? 'block' : 'hidden'} lg:block flex-shrink-0`}
            style={{ width: 256 }}
          >
            <div
              className="rounded-xl p-6 sticky top-24"
              style={{ background: 'white', border: '1.5px solid var(--light)', boxShadow: '0 2px 12px rgba(0,49,73,0.05)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 14, color: 'var(--navy)' }}>
                  Filters
                </h3>
                <button
                  onClick={() => {
                    setCity('All Cities'); setType('All Types'); setMinPrice('');
                    setMaxPrice(''); setMinBeds('Any'); setMinBaths('Any');
                  }}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 11, color: 'var(--teal)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Reset All
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {/* City */}
                <div>
                  <label className="input-label">City</label>
                  <select className="input-field" value={city} onChange={e => setCity(e.target.value)}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="input-label">Property Type</label>
                  <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                {/* Price range */}
                <div>
                  <label className="input-label">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                      className="input-field"
                      style={{ minWidth: 0 }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                      className="input-field"
                      style={{ minWidth: 0 }}
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="input-label">Bedrooms</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {BED_OPTS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setMinBeds(opt)}
                        className="px-3 py-1.5 rounded transition-all duration-150 focus-visible:outline-2 focus-visible:outline-teal-500"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: 12,
                          background: minBeds === opt ? 'var(--teal)' : 'var(--light)',
                          color:      minBeds === opt ? 'white'       : 'var(--navy)',
                          border:     'none',
                          cursor:     'pointer',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="input-label">Bathrooms</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {BATH_OPTS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setMinBaths(opt)}
                        className="px-3 py-1.5 rounded transition-all duration-150 focus-visible:outline-2 focus-visible:outline-teal-500"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 700,
                          fontSize: 12,
                          background: minBaths === opt ? 'var(--teal)' : 'var(--light)',
                          color:      minBaths === opt ? 'white'       : 'var(--navy)',
                          border:     'none',
                          cursor:     'pointer',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => fetchListings(true)} className="btn-primary w-full justify-center">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : ''}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden">
                    <div className="skeleton" style={{ height: 200 }} />
                    <div className="p-4 space-y-3">
                      <div className="skeleton" style={{ height: 18, width: '65%' }} />
                      <div className="skeleton" style={{ height: 14, width: '40%' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-24">
                <span style={{ fontSize: 48 }}>🏘️</span>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--navy)', marginTop: 16 }}>
                  No listings found
                </p>
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--gray)', marginTop: 8 }}>
                  Try adjusting your filters or expanding your search area.
                </p>
              </div>
            ) : view === 'map' ? (
              <div className="rounded-xl overflow-hidden" style={{ height: 640 }}>
                <MapView listings={filteredListings} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredListings.map((listing, i) => (
                    <div key={listing.mlsNumber || i} style={{ animation: `fadeUp 0.4s ease ${i * 50}ms both` }}>
                      <PropertyCard listing={listing} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {numPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="btn-outline"
                      style={{ padding: '8px 16px', opacity: page === 1 ? 0.4 : 1 }}
                    >
                      ← Prev
                    </button>
                    {Array.from({ length: numPages }, (_, i) => i + 1).slice(
                      Math.max(0, page - 3),
                      Math.min(numPages, page + 2)
                    ).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className="w-10 h-10 rounded-lg font-bold text-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-teal-500"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          background: p === page ? 'var(--teal)' : 'white',
                          color:      p === page ? 'white'       : 'var(--navy)',
                          border:     `1.5px solid ${p === page ? 'var(--teal)' : 'var(--light)'}`,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(numPages, p + 1))}
                      disabled={page === numPages}
                      className="btn-outline"
                      style={{ padding: '8px 16px', opacity: page === numPages ? 0.4 : 1 }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ borderTop: '1px solid var(--light)', padding: '40px 0', background: 'var(--off-white, #F8F9FA)' }}>
        <div className="container-wide text-center">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--navy)', marginBottom: 12 }}>
            Can't find what you're looking for?
          </p>
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: 'var(--gray)', marginBottom: 20 }}>
            Joel has access to off-market listings and upcoming properties. Get in touch.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Joel
          </a>
        </div>
      </div>
    </div>
  );
}
