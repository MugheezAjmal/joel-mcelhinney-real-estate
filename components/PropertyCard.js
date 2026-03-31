import Link from 'next/link';
import Image from 'next/image';

function formatPrice(price) {
  if (!price) return 'Price upon request';
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(price);
}

export default function PropertyCard({ listing, featured = false }) {
  const {
    mlsNumber,
    listPrice,
    address,
    details,
    images,
    type,
  } = listing || {};

  const streetAddress = address
    ? `${address.streetNumber || ''} ${address.streetName || ''}`.trim()
    : '123 Sample Street';
  const city    = address?.city || 'Saint John';
  const province = address?.state || 'NB';
  const beds    = details?.numBedrooms || details?.numBedroomsPlus || '—';
  const baths   = details?.numBathrooms || '—';
  const sqft    = details?.sqft ? Number(details.sqft).toLocaleString() : null;
  const propType = type || details?.propertyType || 'Residential';
  const imgSrc  = images?.[0] || `https://placehold.co/800x560/003149/E2E2E2?text=${encodeURIComponent(streetAddress)}`;

  return (
    <article className={`card overflow-hidden flex flex-col group ${featured ? 'ring-2 ring-teal-500' : ''}`}>
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/11' }}>
        <img
          src={imgSrc}
          alt={`${streetAddress}, ${city}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={e => {
            e.currentTarget.src = `https://placehold.co/800x560/003149/E2E2E2?text=Photo+Not+Available`;
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Price badge */}
        <div
          className="absolute bottom-3 left-3 px-3 py-1.5 rounded"
          style={{ background: 'var(--teal)', backdropFilter: 'blur(8px)' }}
        >
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 15, color: 'white', letterSpacing: '-0.01em' }}>
            {formatPrice(listPrice)}
          </span>
        </div>

        {/* Type badge */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded"
          style={{ background: 'rgba(0,49,73,0.80)', backdropFilter: 'blur(8px)' }}
        >
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 10, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {propType}
          </span>
        </div>

        {featured && (
          <div
            className="absolute top-3 left-3 px-2 py-1 rounded"
            style={{ background: 'var(--exit-red, #EE3124)' }}
          >
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 9, color: 'white', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--navy)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          {streetAddress}
        </h3>
        <p
          style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 13,
            color: 'var(--gray)',
            marginTop: 3,
          }}
        >
          {city}, {province}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--light)' }}>
          {[
            { icon: '🛏', value: beds,  label: 'Beds' },
            { icon: '🚿', value: baths, label: 'Baths' },
            ...(sqft ? [{ icon: '📐', value: sqft, label: 'Sq Ft' }] : []),
          ].map(({ icon, value, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span style={{ fontSize: 13 }}>{icon}</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--navy)' }}>
                {value}
              </span>
              <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--gray)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* MLS # */}
        {mlsNumber && (
          <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: '#ABADB0', marginTop: 'auto', paddingTop: 12 }}>
            MLS® {mlsNumber}
          </p>
        )}

        {/* View button */}
        <Link
          href={mlsNumber ? `/listings/${mlsNumber}` : '/listings'}
          className="btn-outline mt-4 justify-center text-xs"
          style={{ padding: '9px 16px' }}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
