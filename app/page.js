'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';

// Noise texture SVG (inline)
const noiseSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

const stats = [
  { value: '10+',  label: 'Years Experience' },
  { value: '200+', label: 'Homes Sold' },
  { value: '4',    label: 'Communities Served' },
  { value: '98%',  label: 'Client Satisfaction' },
];

const journeySteps = {
  buy: [
    { num: '01', title: 'Define Your Goals',     body: 'Clarify your must-haves, budget and timeline with a free consultation.' },
    { num: '02', title: 'Get Pre-Approved',       body: 'Secure your mortgage pre-approval so you can act fast when the right home appears.' },
    { num: '03', title: 'Search & Tour Homes',    body: 'Browse MLS listings and tour properties — in-person or virtually.' },
    { num: '04', title: 'Make an Offer',          body: 'Joel crafts a competitive offer backed by market data and negotiation expertise.' },
    { num: '05', title: 'Close with Confidence',  body: 'From inspection to keys in hand, Joel guides you every step of the way.' },
  ],
  sell: [
    { num: '01', title: 'Market Valuation',       body: 'Get a comprehensive Comparative Market Analysis — at no charge.' },
    { num: '02', title: 'Prepare Your Home',      body: 'Staging advice, professional photos and a marketing plan tailored to your property.' },
    { num: '03', title: 'Go Live on MLS',         body: 'Maximum exposure across MLS, social media and Joel\'s buyer network.' },
    { num: '04', title: 'Review Offers',          body: 'Joel evaluates every offer and negotiates the best possible terms for you.' },
    { num: '05', title: 'Close & Move Forward',   body: 'Smooth conditional period management and a seamless closing process.' },
  ],
};

const testimonials = [
  {
    name:  'Sarah & Tom M.',
    area:  'Rothesay, NB',
    text:  'Joel made buying our first home a stress-free experience. His knowledge of the Saint John market is unmatched, and he was always available to answer our questions.',
    stars: 5,
  },
  {
    name:  'David K.',
    area:  'Quispamsis, NB',
    text:  'We sold our home in 12 days over asking price. Joel\'s marketing strategy and negotiation skills are outstanding. Highly recommend!',
    stars: 5,
  },
  {
    name:  'Jennifer L.',
    area:  'Saint John, NB',
    text:  'As a first-time seller, I was nervous about the process. Joel walked me through every step and kept me informed. I couldn\'t be happier with the result.',
    stars: 5,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery]   = useState('');
  const [listings,    setListings]      = useState([]);
  const [loadingList, setLoadingList]   = useState(true);
  const [activeJourney, setActiveJourney] = useState('buy');
  const [visibleStats,  setVisibleStats]  = useState(false);

  useEffect(() => {
    // Fetch featured listings
    fetch('/api/listings?resultsPerPage=6&status=A')
      .then(r => r.json())
      .then(d => setListings(d.listings || []))
      .catch(() => setListings([]))
      .finally(() => setLoadingList(false));

    // Trigger stats animation on scroll
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisibleStats(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    const el = document.getElementById('stats-section');
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/listings?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/listings');
    }
  };

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(150deg, #001e2d 0%, #003149 50%, #004a6e 80%, #008C9A 100%)',
        }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: noiseSVG, opacity: 0.6 }} />

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,140,154,0.18) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Second radial */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,140,154,0.10) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
          }}
        />

        <div className="container-wide relative z-10 text-center py-32 pt-40">
          {/* Overline */}
          <p
            className="animate-fade-up"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
              marginBottom: 24,
            }}
          >
            EXIT Realty Specialists &bull; Saint John, NB
          </p>

          {/* Display heading */}
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'white',
              marginBottom: 32,
            }}
          >
            Your Home.
            <br />
            <span style={{ color: 'var(--teal)', display: 'inline-block' }}>
              Your Journey.
            </span>
          </h1>

          <p
            className="animate-fade-up delay-200"
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 400,
              fontSize: 18,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 560,
              margin: '0 auto 48px',
              lineHeight: 1.7,
            }}
          >
            Expert real estate guidance for buyers and sellers across Saint John, Rothesay, Quispamsis and surrounding communities.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by city, address, or MLS#…"
              className="flex-1 px-5 py-4 rounded-lg text-navy-900 text-sm"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 15,
                border: '2px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                outline: 'none',
                color: 'var(--navy)',
              }}
            />
            <button type="submit" className="btn-primary flex-shrink-0">
              Search Homes
            </button>
          </form>

          {/* Quick links */}
          <div className="animate-fade-up delay-400 flex flex-wrap justify-center gap-4 mt-8">
            {[
              { label: 'Browse All Listings', href: '/listings' },
              { label: 'Calculate Mortgage',  href: '/calculators' },
              { label: 'Book a Consultation', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'underline',
                  textUnderlineOffset: 4,
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ opacity: 0.5 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ─── STATS STRIP ─────────────────────────────────────────────────── */}
      <section id="stats-section" style={{ background: 'var(--teal)', padding: '32px 0' }}>
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className="text-center"
                style={{
                  opacity: visibleStats ? 1 : 0,
                  transform: visibleStats ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    color: 'white',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.75)',
                    marginTop: 6,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUY OR SELL CTA ─────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--off-white, #F8F9FA)' }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 12 }}>
              What brings you here?
            </p>
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                letterSpacing: '-0.03em',
                color: 'var(--navy)',
              }}
            >
              Your Real Estate Journey Starts Here
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buy card */}
            <Link href="/buy" className="group block">
              <div
                className="relative overflow-hidden rounded-xl h-80 flex items-end p-8 transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(150deg, #003149 0%, #004a6e 100%)',
                  boxShadow: '0 8px 40px rgba(0,49,73,0.25)',
                }}
              >
                <div className="absolute inset-0" style={{ backgroundImage: noiseSVG }} />
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,140,154,0.2) 0%, transparent 70%)',
                    transform: 'translate(30%, -30%)',
                  }}
                />
                {/* Icon */}
                <div
                  className="absolute top-8 left-8 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,140,154,0.2)', border: '1.5px solid rgba(0,140,154,0.4)' }}
                >
                  <span style={{ fontSize: 24 }}>🏠</span>
                </div>

                <div className="relative z-10">
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: 8 }}>
                    Ready to buy?
                  </p>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 900,
                      fontSize: 28,
                      color: 'white',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      marginBottom: 12,
                    }}
                  >
                    Find Your<br />Dream Home
                  </h3>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--teal)', letterSpacing: '0.04em' }}
                  >
                    Start Buying <span>→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Sell card */}
            <Link href="/sell" className="group block">
              <div
                className="relative overflow-hidden rounded-xl h-80 flex items-end p-8 transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(150deg, #007280 0%, #008C9A 100%)',
                  boxShadow: '0 8px 40px rgba(0,140,154,0.25)',
                }}
              >
                <div className="absolute inset-0" style={{ backgroundImage: noiseSVG }} />
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,49,73,0.2) 0%, transparent 70%)',
                    transform: 'translate(30%, -30%)',
                  }}
                />
                {/* Icon */}
                <div
                  className="absolute top-8 left-8 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,49,73,0.2)', border: '1.5px solid rgba(0,49,73,0.3)' }}
                >
                  <span style={{ fontSize: 24 }}>📈</span>
                </div>

                <div className="relative z-10">
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', marginBottom: 8 }}>
                    Ready to sell?
                  </p>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 900,
                      fontSize: 28,
                      color: 'white',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      marginBottom: 12,
                    }}
                  >
                    Maximize Your<br />Home's Value
                  </h3>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'white', letterSpacing: '0.04em' }}
                  >
                    Start Selling <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── JOURNEY STEPS ──────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-wide">
          {/* Toggle tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1.5px solid var(--light)' }}>
              {['buy', 'sell'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveJourney(tab)}
                  className="px-8 py-3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-teal-500"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: activeJourney === tab ? 'var(--navy)' : 'white',
                    color:      activeJourney === tab ? 'white'       : 'var(--gray)',
                  }}
                >
                  {tab === 'buy' ? 'Buying Process' : 'Selling Process'}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.03em',
                color: 'var(--navy)',
              }}
            >
              {activeJourney === 'buy' ? 'How Buying a Home Works' : 'How Selling Your Home Works'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {journeySteps[activeJourney].map((step, i) => (
              <div
                key={step.num}
                className="relative"
                style={{
                  opacity: 1,
                  animation: `fadeUp 0.5s ease ${i * 80}ms both`,
                }}
              >
                {/* Connector line */}
                {i < 4 && (
                  <div
                    className="hidden lg:block absolute top-6 left-1/2 w-full h-[1px]"
                    style={{ background: 'linear-gradient(90deg, var(--teal), transparent)', zIndex: 0 }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'var(--teal)', boxShadow: '0 4px 16px rgba(0,140,154,0.3)' }}
                  >
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 14, color: 'white' }}>
                      {step.num}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: 14,
                      color: 'var(--navy)',
                      marginBottom: 8,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontSize: 13,
                      color: 'var(--gray)',
                      lineHeight: 1.65,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href={activeJourney === 'buy' ? '/buy' : '/sell'} className="btn-primary">
              {activeJourney === 'buy' ? 'Learn More About Buying →' : 'Learn More About Selling →'}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--off-white, #F8F9FA)' }}>
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 8 }}>
                Active MLS® Listings
              </p>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--navy)',
                }}
              >
                Featured Properties
              </h2>
            </div>
            <Link href="/listings" className="btn-outline flex-shrink-0">
              View All Listings
            </Link>
          </div>

          {loadingList ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <div className="skeleton" style={{ height: 220 }} />
                  <div className="p-5 space-y-3">
                    <div className="skeleton" style={{ height: 20, width: '70%' }} />
                    <div className="skeleton" style={{ height: 14, width: '45%' }} />
                    <div className="skeleton" style={{ height: 14, width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.slice(0, 6).map((listing, i) => (
                <div
                  key={listing.mlsNumber || i}
                  style={{ animation: `fadeUp 0.5s ease ${i * 80}ms both` }}
                >
                  <PropertyCard listing={listing} featured={i === 0} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── ABOUT JOEL ─────────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(0,140,154,0.08) 0%, rgba(0,49,73,0.05) 100%)' }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 8px 48px rgba(0,49,73,0.18), 0 2px 8px rgba(0,49,73,0.08)' }}
              >
                <img
                  src="/joel-photo.jpg"
                  alt="Joel McElhinney — REALTOR®"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: 520 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 rounded-xl px-5 py-4"
                style={{
                  background: 'var(--teal)',
                  boxShadow: '0 8px 32px rgba(0,140,154,0.35)',
                }}
              >
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 22, color: 'white', lineHeight: 1 }}>
                  10+
                </p>
                <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Years in Real Estate
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 16 }}>
                Meet Your REALTOR®
              </p>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--navy)',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                Joel McElhinney
                <br />
                <span style={{ color: 'var(--teal)', fontSize: '0.6em', fontWeight: 700, letterSpacing: '0.02em' }}>
                  REALTOR® — EXIT Realty Specialists
                </span>
              </h2>

              <p
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 16,
                  color: '#4a5568',
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                Before becoming a licensed REALTOR® in 2021, I spent over 10 years in commercial real estate — sales, leasing, contracts and investment strategy. I now bring that depth of experience to help residential buyers and sellers across Greater Saint John make smarter, more confident real estate decisions.
              </p>
              <p
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 16,
                  color: '#4a5568',
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                For me, it's not just about a transaction. It's about finding a property that truly fits your lifestyle, your goals and your long-term financial plans.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  Learn More About Joel
                </Link>
                <Link href="/contact" className="btn-outline">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--navy)' }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 12 }}>
              Client Stories
            </p>
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.03em',
                color: 'white',
              }}
            >
              What Clients Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="rounded-xl p-8"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animation: `fadeUp 0.5s ease ${i * 100}ms both`,
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} style={{ color: '#F6B83D', fontSize: 16 }}>★</span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: 20,
                  }}
                >
                  "{t.text}"
                </p>
                <div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 14, color: 'white' }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 12, color: 'var(--teal)', marginTop: 2 }}>
                    {t.area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOOLS PREVIEW ───────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="font-subheading" style={{ color: 'var(--teal)', fontSize: 11, marginBottom: 12 }}>
              Free Tools
            </p>
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.03em',
                color: 'var(--navy)',
              }}
            >
              Calculators to Help You Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '💰', title: 'Mortgage Calculator',    desc: 'Estimate your monthly payments with current rates.', href: '/calculators#mortgage' },
              { icon: '🏡', title: 'Affordability Calculator', desc: 'Find out how much home you can comfortably afford.', href: '/calculators#affordability' },
              { icon: '📋', title: 'Land Transfer Tax (NB)', desc: 'Calculate New Brunswick land transfer tax instantly.', href: '/calculators#land-transfer' },
              { icon: '🔄', title: 'Rent vs. Buy',           desc: 'Compare renting vs. owning in your current market.', href: '/calculators#rent-vs-buy' },
            ].map(({ icon, title, desc, href }) => (
              <Link key={href} href={href} className="card p-6 block group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(0,140,154,0.1)', fontSize: 22 }}
                >
                  {icon}
                </div>
                <h4
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: 15,
                    color: 'var(--navy)',
                    marginBottom: 8,
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 13,
                    color: 'var(--gray)',
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
                <p
                  className="mt-4 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 12, color: 'var(--teal)', letterSpacing: '0.04em' }}
                >
                  Open Calculator →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '100px 0', background: 'linear-gradient(135deg, #001e2d 0%, #003149 60%, #008C9A 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: noiseSVG, opacity: 0.5 }} />
        <div className="container-wide relative z-10 text-center">
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.04em',
              color: 'white',
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Ready to Make
            <br />
            <span style={{ color: 'var(--teal)' }}>Your Move?</span>
          </h2>
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 17,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 480,
              margin: '0 auto 40px',
              lineHeight: 1.7,
            }}
          >
            Book a free, no-obligation consultation and let's talk about your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Book a Free Consultation
            </Link>
            <Link href="/listings" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
