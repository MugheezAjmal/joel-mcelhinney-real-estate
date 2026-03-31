'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/buy',         label: 'Buy' },
  { href: '/sell',        label: 'Sell' },
  { href: '/listings',    label: 'Listings' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/about',       label: 'About' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome || mobileOpen
            ? 'bg-white/95 backdrop-blur-md shadow-navy-sm'
            : 'bg-transparent'
        }`}
        style={{ height: scrolled ? 68 : 80, display: 'flex', alignItems: 'center' }}
      >
        <div className="container-wide w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Logo
              variant={!scrolled && isHome && !mobileOpen ? 'light' : 'dark'}
              size="md"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              const light  = !scrolled && isHome;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-sm
                    ${active
                      ? light ? 'text-white' : 'text-teal-500'
                      : light ? 'text-white/80 hover:text-white' : 'text-navy-900 hover:text-teal-500'
                    }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.04em' }}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                      style={{ background: light ? 'white' : 'var(--teal)' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary text-sm"
              style={{ padding: '10px 24px' }}
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-10 flex flex-col gap-[5px] p-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="block h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: i === 1 ? (mobileOpen ? 20 : 24) : 24,
                  background: !scrolled && isHome && !mobileOpen ? 'white' : 'var(--navy)',
                  transform:
                    mobileOpen
                      ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 1 ? 'opacity(0) scale(0)'
                      : 'rotate(-45deg) translate(5px, -5px)'
                      : 'none',
                  opacity: i === 1 && mobileOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-navy-900 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'var(--navy)', paddingTop: 80 }}
      >
        <nav className="flex flex-col px-8 py-8 gap-2">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`text-2xl font-extrabold tracking-tight py-3 border-b border-white/10 transition-colors duration-200
                  ${active ? 'text-teal-500' : 'text-white hover:text-teal-400'}`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn-primary mt-6 justify-center"
          >
            Book a Consultation
          </Link>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              EXIT Realty Specialists
            </p>
            <a
              href="tel:+15061234567"
              className="text-white hover:text-teal-400 transition-colors duration-200"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 20, marginTop: 4, display: 'block' }}
            >
              (506) 123-4567
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
